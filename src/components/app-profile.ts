import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import jQuery from 'jquery';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7292",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
  })

@customElement('app-profile')
export class AppProfile extends LitElement {

    @property({ type: String })    
    profilepic = '/images/pix.png';
    qrcodeurl = '';
    userid = '';
    token = '';
    firstname = '';
    lastname = '';
    email = '';
    mobile = '';
    newpassword = '';
    confnewpassword = '';

    @state()
    message = '';
    previewUrl: string | undefined;


    @property({ type: Object })
    selectedFile: File | undefined;
  
    @query('form')
    formElement!: HTMLFormElement;

    @property({ type: Boolean })
    chkMfa = false;
    showSave = false;
    chgPword = false;

    firstUpdated() {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const uid = window.sessionStorage.getItem('USERID');
            if (uid !== null) {
              this.userid = uid;
            }
        }

        if (typeof window !== 'undefined' && window.sessionStorage) {
            const tokenid = window.sessionStorage.getItem('TOKEN');
            if (tokenid !== null) {
                this.token = tokenid;
            }
        }

        this.chgPword = false;
        this.chkMfa = false;
        this.message = "Please wait.....";
        api.get(`/api/getbyid/${this.userid}`, { headers: {
            Authorization: `Bearer ${this.token}`
        }} )
            .then((res: any) => {
                    this.message = res.data.user.message;
                   this.firstname = res.data.user.firstname;                
                    this.lastname = res.data.user.lastname;
                    this.email = res.data.user.email;
                    this.mobile = res.data.user.mobile;
                    this.profilepic = res.data.user.profilepic;
                    this.qrcodeurl = res.data.user.qrcodeurl;
              }, (error: any) => {
                this.message = error.response.data.message;
            });    
            setTimeout(() => {
                this.message = '';
            }, 3000);          
    }


  render() {
    return html`
    <div class="container mt-3 mb-5">
     <div class="card card-width bs-info-border-subtle x-height">
        <div class="card-header bg-info text-light">
            <strong>USER'S PROFILE NO.&nbsp; ${this.userid}</strong>
        </div>
        <div class="card-body">
         <form enctype="multipart/form-data" autocomplete='off'>
         <div class="row">
            <div class="col">
             <div class="mb-3">
               <input type="text" required id="fname" name="fname" value="${this.firstname}" class="form-control" placeholder="First Name" autocomplete="off"/>
             </div>
             <div class="mb-3">
               <input type="text" required id="lname" name="lname" value="${this.lastname}" class="form-control bg-input" placeholder="Last Name" autocomplete="off"/>
             </div>
             <div class="mb-3">
               <input type="email" id="email" name="email" value="${this.email}" class="form-control bg-input" placeholder="Email Address" readOnly/>
             </div>
             <div class="mb-3">
               <input type="text" required id="mobile" name="mobile" value="${this.mobile}" class="form-control bg-input" placeholder="Mobile No." autocomplete="off"/>
             </div>
             <div class="mb-3">
               <button type="button" @click="${this._submitProfile}" class="btn btn-info">save</button>
             </div>
            </div>
            <div class="col">
                ${this.profilepic !== ''
                ? html`<img id="userpic" class="usr" src="${this.profilepic}" alt=""/>`
                : html`<img id="userpic" class="usr"  alt=""/>`}

            <div class="mb-3">
                <input type="file" multiple accept="image/*" @change="${this._changePicture}" class="form-control form-control-sm mt-3"/>
            </div>
            </form>

         </div>
         <div class="mb-3">
         </div>    
        </div>

        <div class="row">
         <div class="col">
            <div class="form-check">
                <input id="chkPwd" type="checkbox" @change="${this._checkboxPassword}" class="form-check-input bg-input cb-border" />
                <label class="form-check-label" for="chgPwd">
                    Change Password
                </label>
            </div>
         </div>
         <div class="col">
            <div class="form-check">
                <input class="form-check-input bg-input cb-border" type="checkbox" id="chkMfa" @change="${this._checkboxMFA}" />
                <label class="form-check-label" for="chkMfa">
                    Multi-Factor Authenticator
                </label>
            </div>
         </div>
        </div>
    
        <div class="row">
            <div class="col">
              ${this.chgPword
                ? html `
                    <div class="mb-3">
                      <input type="password" id="newpassword" name="newpassword" class="form-control pwd mt-2" placeholder="enter new Password" autocomplete="off"/>
                    </div>
                    <div class="mb-3">
                        <input type="password" id="confnewpassword" name="confnewpassword" class="form-control pwd" placeholder="confirm new Password" autocomplete="off"/>
                    </div>
                    <button type="button" @click="${this._changePassword}" class="btn btn-primary">change password</button>
                    `
                : null }
                    
                ${this.chkMfa
                    ? html `<img class="qrcode2" src="${this.qrcodeurl}" alt="QRCODE"/>`
                    : null}                
                                
            </div>
            <div class="col"> 
              ${this.chkMfa 
                ? html `
                <p id="qrcode-cap1" class='text-danger'><strong>Requirements</strong></p>
                <p id="qrcode-cap2">You need to install <strong>Google or Microsoft Authenticator</strong> in your Mobile Phone, once installed, click Enable Button below, and <strong>SCAN QR CODE</strong>, next time you login, another dialog window will appear, then enter the <strong>OTP CODE</strong> from your Mobile Phone in order for you to login.</p>
                <div class="row">
                    <div class="col btn-1">
                        <button @click="${this._enableMFA}" type="button" class="btn btn-primary mx-1 qrcode-cap3">Enable</button>
                        <button @click="${this._disableMFA}" type="button" class="btn btn-secondary qrcode-cap3">Disable</button>
                    </div>
                    <div class="col col-3 btn-2">
                    </div>
                </div>` : null }

            </div>
        </div>



        </form>
        </div>
        <div class="card-footer">
            <div class="w-100 text-left text-danger">${this.message}</div>
        </div>
     </div>
    </div>  
    `;
    }

  createRenderRoot() {
    return this;
  }

   _submitProfile(event: any) {
    event.preventDefault();    
    const formData = new FormData(this.formElement);
    const data: { [key: string]: string } = {};
    this.message = "please wait...";
    formData.forEach((value, key) => {
        data[key] = value.toString();
        const jdata =JSON.stringify({ lastname: data.lname, 
            firstname: data.fname, mobile: data.mobile });
        api.patch(`/api/updateprofile/${this.userid}`, jdata, { headers: {
        Authorization: `Bearer ${this.token}`
        }})
        .then((res: any) => {
                this.message = res.data.message;
          }, (error: any) => {
                this.message = error.response.data.message;
        });
        setTimeout(() => {
          this.message = '';
        }, 3000);           
    });    
  }  
  
   _changePicture(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        jQuery("#userpic").attr('src',URL.createObjectURL(input.files[0]));
    }

    if (this.selectedFile) {
        let formdata = new FormData();
        formdata.append('Id', this.userid);
        formdata.append('Profilepic', this.selectedFile);

        api.post("/api/uploadpicture", formdata, { headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.token}`
        }} )
        .then((res: any) => {
            this.message = res.data.message;
            this.profilepic = res.data.profilepic;
            sessionStorage.setItem('USERPIC',res.data.profilepic);
            setTimeout(() => {
              this.message = '';
              location.reload();

            }, 3000);    
        }, (error: any) => {
              this.message = error.response.data.message;
        });
        setTimeout(() => {
            this.message = '';
        }, 3000);        
    }    
  }

   _enableMFA(event: Event) {
    event.preventDefault();
    const data =JSON.stringify({ Twofactorenabled: true });
    api.patch(`/api/enablemfa/${this.userid}`, data, { headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`
    }} )
    .then((res: any) => {
        this.qrcodeurl = res.data.qrcodeurl;
        this.message = res.data.message;
      }, (error: any) => {
            this.message = error.response.data.message;
    });
    setTimeout(() => {
      this.message = '';
    }, 3000);            
  }

   _disableMFA(event: Event) {
    event.preventDefault();
    const data =JSON.stringify({ Twofactorenabled: false });
    api.patch(`/api/enablemfa/${this.userid}`, data, { headers: {
        Authorization: `Bearer ${this.token}`
    }} )
    .then((res: any) => {
            this.qrcodeurl = '';
            this.message = res.data.message;
      }, (error: any) => {
            this.message = error.response.data.message;
    });
    setTimeout(() => {
      this.message = '';
    }, 3000);            
  }

  _checkboxMFA(event: Event) {
    event.preventDefault();
    if (this.chkMfa) {
        jQuery('#chkPwd').prop('checked', false);
        jQuery("#cpwd").hide();
        // jQuery("#mfa1").show();
        // jQuery("#mfa2").show();
        this.chkMfa = false;
        this.chgPword = false;
        this.showSave = false;
      } 
      else 
      {
        this.qrcodeurl = '/images/qrcode.png';
        jQuery('#chkPwd').prop('checked', false);
        this.chgPword = false;
        this.chkMfa = true;
        // jQuery("#mfa1").hide();  
        // jQuery("#mfa2").hide();                  
        this.showSave = true;
      }        
  }

  
  _checkboxPassword(event: Event) {
    event.preventDefault();
    if (this.chgPword) {
        this.chgPword = false;
        jQuery("#cpwd").show();
        jQuery("#mfa1").hide();  
        jQuery("#mfa2").hide();  
        this.showSave = false;
        jQuery("#cpwd").hide();
        window.location.reload();
    } else {
            this.chgPword = true;
            jQuery('#chkMfa').prop('checked', false);
            this.chkMfa = false;
            this.newpassword = '';
            this.confnewpassword = '';
            this.showSave = true;
    }            
  }

  _changePassword(event: Event) {
    event.preventDefault();
    const formData = new FormData(this.formElement);
    const data: { [key: string]: string } = {};
    this.message = "please wait...";
    formData.forEach((value, key) => {
        data[key] = value.toString();
        let pword: any = jQuery("#newpassword").val();
        let conf: any = jQuery("#confnewpassword").val();
        this.newpassword = pword;
        this.confnewpassword = conf;        
    });    
    
    if (this.newpassword === '') {
        this.message = "Please enter New Password.";
        setTimeout(() => {
          this.message = '';
        }, 3000);
        return;
    }
    if (this.confnewpassword === '') {
        this.message = "Please confirm New Password.";
        setTimeout(() => {
          this.message = '';
        }, 3000);
        return;
    }
    if (this.newpassword != this.confnewpassword) {
        this.message = "New Password does not matched.";
        setTimeout(() => {
          this.message = '';
        }, 3000);
        return;
    }
    this.message = 'Please wait...';
    const jsonData =JSON.stringify({ password: this.newpassword });
    api.patch(`/api/updatepassword/${this.userid}`, jsonData, { headers: {
    Authorization: `Bearer ${this.token}`
    }} )
    .then((res: any) => {
          this.message = res.data.message;
      }, (error: any) => {
            this.message = error.response.data.message;
    });
    setTimeout(() => {
        this.message = '';
        this.newpassword = '';
        this.confnewpassword = '';
    }, 3000);              
  }
}
