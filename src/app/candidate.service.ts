import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Candidate } from './model/candidate';
import { Skill } from './model/skill';
import { RequestWrapper } from './model/requestWrapper';
import { CustomHttpResponse } from './model/custom-http-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCandidates(): Observable<CustomHttpResponse>{
    return this.http.get<CustomHttpResponse>(`${this.apiServerUrl}/all`)
  }

  public addCandidate(candidate: Candidate): Observable<CustomHttpResponse>{
    console.log(candidate)
    return this.http.post<CustomHttpResponse>(`${this.apiServerUrl}/addCandidate`,candidate)
  }


  /*
  public addSkills(skills: Skill[]): Observable<Skill[]>{
    return this.http.post<Skill[]>(`${this.apiServerUrl}/addSkills`,skills)
  }

  public updateCandidateSkill(wrapper: RequestWrapper): Observable<RequestWrapper>{
    return this.http.put<RequestWrapper>(`${this.apiServerUrl}/updateCandidateSkill`,wrapper)
  }

  public removeSKillFromCandidate(wrapper: RequestWrapper): Observable<RequestWrapper>{
    return this.http.put<RequestWrapper>(`${this.apiServerUrl}/removeSkillFromCandidate`,wrapper)
  }

  public removeCandidate(id: number): Observable<void> */
 

}
