import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidateService } from './candidate.service';
import { Candidate } from './model/candidate';
import { CustomHttpResponse } from './model/custom-http-response';
import { RequestWrapper } from './model/requestWrapper';
import { Skill } from './model/skill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public candidates!: Candidate[];
  public updateCandidate!: Candidate;
  public deletedCandidate!: Candidate;
  public candidateSkills!: Array<Skill>;
  
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

      for(let i = 0; i < skillsArray.length; i++){
        let skill = {} as Skill
        skill.name = skillsArray[i]
        console.log(skill.name)
        skillsArrayObj.push(skill)
      }
      jsonObj.skills = skillsArrayObj
      console.log(skillsArrayObj)
      addForm.setValue(jsonObj)

      console.log('ADD METHOD')
      console.log(addForm.value)
      
     this.candidateService.addCandidate(addForm.value).subscribe(
      (response: CustomHttpResponse) =>{
        this.getCandidates()
        console.log(response)
        addForm.reset()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset()
      }
    ) 
  }

  public updateCandidateWithSkill(updateForm: NgForm): void{
    let newSkill = {} as Skill
    newSkill.name = updateForm.value.newSKill
    
    let wrapper = {} as RequestWrapper
    wrapper.candidate = this.updateCandidate
    wrapper.skill = newSkill

    this.candidateService.updateCandidateSkill(wrapper).subscribe(
      (response: CustomHttpResponse) =>{
        this.getCandidates()
        console.log(response)
        updateForm.reset()
        
        if(response.statusCode == 400)
          alert(response.msg)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteCandidate(candidateId: number): void{
    this.candidateService.removeCandidate(candidateId).subscribe(
      (response: CustomHttpResponse) =>{
        this.getCandidates()
        console.log(response)
        if(response.statusCode == 400)
          alert(response.msg)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public removeSkill(skill:Skill):void{
    let btnClose = document.querySelector('#close-btn-show-candidates-modal') as HTMLElement
    console.log(btnClose)
    btnClose.click()
    
    let wrapper = {} as RequestWrapper
    wrapper.candidate = this.updateCandidate
    wrapper.skill = skill

    this.candidateService.removeSKillFromCandidate(wrapper).subscribe(
      (response: CustomHttpResponse) =>{
        this.getCandidates()
        console.log(response)
        if(response.statusCode == 400)
          alert(response.msg)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )

    
  }

  public searchCandidate(searchKey: string): void{
    const foundCandidates: Candidate[] = [];
    for(const candidate of this.candidates){
      if(candidate.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1){
        foundCandidates.push(candidate)
      }
    }
    this.candidates = foundCandidates
    //ukoliko nema nista resetuj
    if(foundCandidates.length === 0 || !searchKey){
      this.getCandidates()
    }
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
      this.updateCandidate = candidate
      btn.setAttribute('data-target','#editCandidateModal')
    }
    if(mode == 'delete'){
      this.deletedCandidate = candidate
      btn.setAttribute('data-target','#deleteCandidateModal')
    }
    if(mode == 'addSkills'){
      btn.setAttribute('data-target','#addSkillsModal')
    }
    if(mode == 'showSkills'){
      this.updateCandidate = candidate
      this.candidateSkills = this.updateCandidate.skills
      btn.setAttribute('data-target','#showCandidateSkillsModal')
    }

    container?.appendChild(btn)
    btn.click()
  }


}
