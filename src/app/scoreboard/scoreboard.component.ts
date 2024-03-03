import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit {
  scoreEntries = [
    { user: 'Caro', score: 120, date: new Date(2024, 2, 3), locked: false },
    { user: 'Jamal', score: 150, date: new Date(2024, 2, 3), locked: false },
    // Add more entries here
  ];

  constructor(){

  }

  lockPastScores() {
    const today = new Date();
    this.scoreEntries.forEach(entry => {
      if (entry.date < today) {
        entry.locked = true;
      }
    });
  }

  scoreForm!: FormGroup;

  ngOnInit(): void {
      this.lockPastScores();
      this.scoreForm = new FormGroup({
        user: new FormControl('', Validators.required),
        score: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        date: new FormControl('', Validators.required)
      })
    }

    addScore() {
      if (this.scoreForm.valid) {
        const newScore = {
          ...this.scoreForm.value,
          locked: false
        };
        this.scoreEntries.push(newScore);
        this.scoreForm.reset();
        this.lockPastScores();
      }
    }
}
   
  

  
  

