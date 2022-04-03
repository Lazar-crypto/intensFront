import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CandidateService } from './candidate.service';
import { Candidate } from './model/candidate';
import { CustomHttpResponse } from './model/custom-http-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public candidates!: Candidate[];
  public pera!: string;
  
  constructor(private candidateService: CandidateService){}

  ngOnInit(): void {
    this.getCandidates()
    this.pera = "Pera zdera"
  }

  public getCandidates(): void{
    
    this.candidateService.getCandidates().subscribe(
      (response: CustomHttpResponse) =>{

        const map = response.data
        const objectValue = Object.values(map)
        objectValue.forEach(value => this.candidates = value)
        /* console.log(this.candidates)
        this.candidates.forEach(candidate=>console.log(candidate.name)) */
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

}
