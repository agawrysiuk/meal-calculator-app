import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../service/data.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface FileUploadData {
  recipeId: string;
  imageFile?: File;
  pdfFile?: File;
}

export type UploadStatus = 'uploading' | 'success' | 'error';

@Component({
  selector: 'app-file-upload-modal',
  standalone: false,
  templateUrl: './file-upload-modal.component.html',
  styleUrl: './file-upload-modal.component.css'
})
export class FileUploadModalComponent implements OnInit {
  imageFile?: File;
  pdfFile?: File;
  recipeId: string;

  imageProgress = 0;
  pdfProgress = 0;
  imageStatus: UploadStatus = 'uploading';
  pdfStatus: UploadStatus = 'uploading';

  private hasImageUpload = false;
  private hasPdfUpload = false;
  private imageCompleted = false;
  private pdfCompleted = false;

  constructor(
    public dialogRef: MatDialogRef<FileUploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadData,
    private dataService: DataService
  ) {
    this.recipeId = data.recipeId;
    this.imageFile = data.imageFile;
    this.pdfFile = data.pdfFile;
    this.hasImageUpload = !!this.imageFile;
    this.hasPdfUpload = !!this.pdfFile;
  }

  ngOnInit() {
    this.startUploads();
  }

  private startUploads() {
    const uploads = [];

    if (this.imageFile) {
      const imageUpload$ = this.dataService.uploadRecipeImage(this.recipeId, this.imageFile).pipe(
        catchError(error => {
          this.imageStatus = 'error';
          this.imageProgress = 100;
          this.imageCompleted = true;
          return of(null);
        })
      );
      uploads.push(imageUpload$);
    }

    if (this.pdfFile) {
      const pdfUpload$ = this.dataService.uploadRecipePdf(this.recipeId, this.pdfFile).pipe(
        catchError(error => {
          this.pdfStatus = 'error';
          this.pdfProgress = 100;
          this.pdfCompleted = true;
          return of(null);
        })
      );
      uploads.push(pdfUpload$);
    }

    // Simulate progress for better UX (since we don't have real progress tracking)
    this.simulateProgress();

    // Execute uploads
    if (uploads.length > 0) {
      forkJoin(uploads).subscribe(
        results => {
          this.handleUploadResults(results);
        }
      );
    }
  }

  private simulateProgress() {
    const progressInterval = setInterval(() => {
      if (this.hasImageUpload && !this.imageCompleted) {
        this.imageProgress = Math.min(this.imageProgress + 10, 90);
      }
      if (this.hasPdfUpload && !this.pdfCompleted) {
        this.pdfProgress = Math.min(this.pdfProgress + 10, 90);
      }

      if ((!this.hasImageUpload || this.imageCompleted) && 
          (!this.hasPdfUpload || this.pdfCompleted)) {
        clearInterval(progressInterval);
      }
    }, 200);
  }

  private handleUploadResults(results: any[]) {
    let resultIndex = 0;

    if (this.hasImageUpload) {
      const imageResult = results[resultIndex++];
      if (imageResult !== null) {
        this.imageStatus = 'success';
      }
      this.imageProgress = 100;
      this.imageCompleted = true;
    }

    if (this.hasPdfUpload) {
      const pdfResult = results[resultIndex];
      if (pdfResult !== null) {
        this.pdfStatus = 'success';
      }
      this.pdfProgress = 100;
      this.pdfCompleted = true;
    }
  }

  getProgressColor(status: UploadStatus): string {
    switch (status) {
      case 'success': return 'accent';
      case 'error': return 'warn';
      default: return 'primary';
    }
  }

  getStatusText(status: UploadStatus): string {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'success': return 'Upload successful';
      case 'error': return 'Upload failed';
    }
  }

  getOverallStatusText(): string {
    const hasErrors = (this.hasImageUpload && this.imageStatus === 'error') || 
                     (this.hasPdfUpload && this.pdfStatus === 'error');
    const allSuccess = (!this.hasImageUpload || this.imageStatus === 'success') && 
                      (!this.hasPdfUpload || this.pdfStatus === 'success');

    if (!this.isComplete()) {
      return 'Uploading files...';
    } else if (hasErrors && allSuccess) {
      return 'Recipe saved successfully!';
    } else if (hasErrors) {
      return 'Recipe saved, but some file uploads failed';
    } else {
      return 'Recipe and files saved successfully!';
    }
  }

  isComplete(): boolean {
    return (!this.hasImageUpload || this.imageCompleted) && 
           (!this.hasPdfUpload || this.pdfCompleted);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}