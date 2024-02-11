import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParam';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { User } from 'src/app/_models/user'
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  //members$: Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]
  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }
  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: respone => {
          if (respone.result && respone.pagination) {
            this.members = respone.result;
            this.pagination = respone.pagination;
          }
        }
      })
    }

  }

  resetFilters() {
      this.userParams = this.memberService.resetUserParams();
      this.loadMembers();
  }


  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }
}
