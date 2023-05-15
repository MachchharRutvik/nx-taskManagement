import { Component } from '@angular/core';
import { CardComponent } from '@task-management/card';
import { ModalService } from '@task-management/task-modal';
import { ApiService } from '../api.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'task-management-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  constructor(private modalService: ModalService, private api: ApiService, private toastEvokeService: ToastEvokeService, private confirmBoxEvokeService: ConfirmBoxEvokeService) { }

  ngOnInit() {
    this.getAllTaskDetails()
  }
  taskDetails: any;
  taskId: any

  getAllTaskDetails() {
    this.api.getAllTaskDetails().subscribe((res: any) => {
      console.log("res", res)
      this.taskDetails = res
    }, (err: any) => {
      console.log("error", err)
    })
  }
  openModal() {
    const title = "Add Task"
    const button = "Add"
    let tasks: any
    this.modalService.openModal(title, button, tasks)
    const subscription = this.modalService.getTaskDetails().subscribe((taskDetails: any) => {
      console.log(taskDetails, "userDetails in userlist")
      taskDetails.completed = false
      this.api.addTasks(taskDetails).subscribe((res: any) => {
        this.modalService.closeModal()
        // console.log(res)
        this.getAllTaskDetails()
        // alert("user added successfully")
        subscription.unsubscribe(); // unsubscribe here
        this.toastEvokeService.success('Success', 'Task Added successfully').subscribe();
      }, (err: any) => {
        console.log("error", err)
        this.modalService.closeModal()
        this.toastEvokeService.danger('Error', 'Error in adding Task').subscribe();
        subscription.unsubscribe(); // unsubscribe on error as well
      })
    })
  }

  deleteTask(id: number) {
    console.log(id, "id")
    this.confirmBoxEvokeService.danger('Delete Task', 'Are you sure you want to delete task?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log(resp)
        if (resp.clickedButtonID === 'confirm') {
          this.api.deleteTaskDetails(id).subscribe((res) => {
            const index = this.taskDetails.findIndex((user: any) => user.id === id);
            if (index !== -1) {
              this.taskDetails.splice(index, 1);
              this.toastEvokeService.success('Success', 'Task Deleted successfully').subscribe();
            }
            // alert("user deleted successfully")
          }, (err: any) => {
            console.log(err, "error in delete")
            alert("Error in deleting user")
            this.modalService.closeModal()
            this.toastEvokeService.danger('Error', 'Error in Deleting Task').subscribe();
          })
        }
      });
  }
  editTask(id: number) {
    console.log(id, "edit user detials")
    this.api.getTaskDetails(id).subscribe((task) => {
      const title = "Edit Task"
      const button = "Update"
      // console.log(user, "user")
      this.modalService.openModal(title, button, task);
      const subscription = this.modalService.getTaskDetails().subscribe((user: any) => {
        if (user) {
          this.api.editTask(user, id).subscribe((res) => {
            this.getAllTaskDetails()
            this.modalService.closeModal()
            this.toastEvokeService.success('Success', 'Task updated successfully').subscribe();
            subscription.unsubscribe()
            // alert("user data updated")
          }, (err) => {
            console.log(err, "error from edituser")
            alert("error in updating user details")
            this.modalService.closeModal()
            this.toastEvokeService.danger('Error', 'Error in updating Task').subscribe();

            subscription.unsubscribe()
          })
        }
      })
    })
  }
  showDetails(id: number) {
    this.api.getTaskDetails(id).subscribe((task) => {
      this.modalService.showDetails(task)

    })
  }
  taskCompleted(id: number) {
    this.api.getTaskDetails(id).subscribe((task) => {
      this.api.taskCompleted(id, task).subscribe((res) => {
        this.getAllTaskDetails()
        this.toastEvokeService.success('Success', 'Task Completed successfully').subscribe();

      })

    })

  }
  getId(id: any, isDelete: any, isEdit: any, isCompleted: any) {
    this.taskId = id
    console.log(id, "evemt Emitter")
    if (isDelete == true) {
      this.deleteTask(id)
    }
    if (isEdit == true) {
      this.editTask(id)
    }
    if (isDelete == false && isEdit == false) {
      this.showDetails(id)
    }
    if (isCompleted == true) {
      this.taskCompleted(id)
    }
  }
  getTaskDetailsFromAddForm(userData: any) {
    console.log(userData, "fromuser list")
  }

}
