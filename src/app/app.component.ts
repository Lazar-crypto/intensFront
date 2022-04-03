import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidateService } from './candidate.service';
import { Candidate } from './model/candidate';
import { CustomHttpResponse } from './model/custom-http-response';
import { Skill } from './model/skill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public candidates!: Candidate[];
  
  constructor(private candidateService: CandidateService){}

  ngOnInit(): void {
    this.getCandidates()
  }

  public getCandidates(): void{
    
    this.candidateService.getCandidates().subscribe(
      (response: CustomHttpResponse) =>{

        const map = response.data
        const objectValue = Object.values(map)
        objectValue.forEach(value => this.candidates = value)
        /* console.log(this.candidates)
        this.candidates.forEach(candidate=>console.log(candidate.name)) */
        
        let num = 1;
        for(let i = 0; i < this.candidates.length;i++){
          this.candidates[i].imgUrl = `https://bootdey.com/img/Content/avatar/avatar${num}.png`
          num++
          if(num == 9)
            num = 1
        }
      
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public addCandidate(addForm: NgForm): void{
    
    let btnClose = document.querySelector('#add-candidate-form') as HTMLElement
    btnClose.click()

      let jsonObj = addForm.value
      console.log(typeof jsonObj)
      const skillsArray:Array<any> = jsonObj.skills.split(',')
      let skillsArrayObj = []
      let skill = {} as Skill

      for(let i = 0; i < skillsArray.length; i++){
        skill.name = skillsArray[i]
        skillsArrayObj.push(skill)
      }
      jsonObj.skills = skillsArrayObj
      addForm.setValue(jsonObj)
      
     this.candidateService.addCandidate(addForm.value).subscribe(
      (response: CustomHttpResponse) =>{
        this.getCandidates()
        //addForm.setValue = {}
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    ) 
  }


  public openModal(candidate: Candidate,mode: string): void{
    const btn = document.createElement('button')
    const container = document.querySelector('#main-container')

    btn.type = 'button'
    btn.style.display = 'none'
    btn.setAttribute('data-toggle','modal')

    //check what btn is clicked
    if(mode == 'add'){
      btn.setAttribute('data-target','#addCandidateModal')
    }
    if(mode == 'edit'){
      btn.setAttribute('data-target','#editCandidateModal')
    }
    if(mode == 'delete'){
      btn.setAttribute('data-target','#deleteCandidateModal')
    }
    if(mode == 'addSkills'){
      btn.setAttribute('data-target','#addSkillsModal')
    }

    container?.appendChild(btn)
    btn.click()
  }


}
