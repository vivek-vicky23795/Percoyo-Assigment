// The JavaScript File : 

class FormValidation {

    // lets define an object that has empty  input values : 

        formValues = {
            username : "",
            email :"",
            phonenumber : "",
        }

    // lets define another object which holds empty error values : 
        errorValues = {
            usernameError: "",
            emailError: "",
            phonenumberError : "",
        }


    // get the input from the form and store it in object literal : formValues
    
        getInputs() {

            this.formValues.username = document.getElementById('username').value.trim();
            this.formValues.email = document.getElementById('email').value.trim();
            this.formValues.phonenumber = document.getElementById('phonenumber').value.trim();


            console.log(this.formValues.username);
            console.log(this.formValues.email);
            console.log(this.formValues.phonenumber);
            
        } 


        showErrorMsg(index, msg) {

            const formGroup = document.getElementsByClassName('form-group')[index];
            formGroup.classList.add("error");
            formGroup.getElementsByTagName('span')[0].textContent = msg;

        }

        showSuccessMsg(index) {

            const formGroup = document.getElementsByClassName('form-group')[index];
            formGroup.classList.remove('error');
            formGroup.classList.add('success');

        }


        validateUsername() {

            let regex = /^[a-zA-Z]+$/;

            if (this.formValues.username === "") {
                this.errorValues.usernameError = "INVALID: username cannot be empty";
                this.showErrorMsg(0,this.errorValues.usernameError);
            } 

            else if (this.formValues.username.length <= 4) {
                this.errorValues.usernameError = "INVALID: username cannot be less than 4 chars";
                this.showErrorMsg(0,this.errorValues.usernameError);
            }

            else if (this.formValues.username.length >= 14 ) {
                
                this.errorValues.usernameError = "INVALID : username cannot contain more than 14 chars";
                this.showErrorMsg(0,this.errorValues.usernameError);
            }

            else if (!(regex.test(this.formValues.username))) {
                this.errorValues.phonenumberError = "INVALID : Username Can't have Numbers and Special Chars";
                this.showErrorMsg(0, this.errorValues.phonenumberError);
            }
            else {
                this.errorValues.usernameError = "";
                this.showSuccessMsg(0);
            }
        }


        validateEmail() {
            
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (this.formValues.email === "") {
                this.errorValues.emailError = "INVALID: email cannot be empty";
                this.showErrorMsg(1,this.errorValues.emailError);
            } 
           
            else if(!(regex.test(this.formValues.email))) {
                this.errorValues.emailError = "INVALID : please check your email address";
                this.showErrorMsg(1,this.errorValues.emailError);
            }
          
            else {
                this.errorValues.emailError = "";
                this.showSuccessMsg(1);
            }
        }


        validatePhonenumber() {

            let regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

            if (this.formValues.phonenumber === "") {
                this.errorValues.phonenumberError = "INVALID: Phonenumber cannot be Empty"
                this.showErrorMsg(2,this.errorValues.phonenumberError);
            } 

            else if (this.formValues.phonenumber.length < 9) {
                this.errorValues.phonenumberError = "INVALID : Number Less Than 10 digits";
                this.showErrorMsg(2, this.errorValues.phonenumberError);
            }

            else if (this.formValues.phonenumber.length > 10) {
                this.errorValues.phonenumberError = "INVALID : Number is Greater Than 10 digits";
                this.showErrorMsg(2, this.errorValues.phonenumberError);
            }

            else if (!(regex.test(this.formValues.phonenumber))) {
                this.errorValues.phonenumberError = "INVALID : check the Number Plz";
                this.showErrorMsg(2, this.errorValues.phonenumberError);
            }
            else {
                this.errorValues.phonenumberError = "";
                this.showSuccessMsg(2);
            }
        } 


        alertMessage(){

            const {usernameError , emailError , phonenumberError , passwordError}= this.errorValues
            if(usernameError === "" && emailError === "" && phonenumberError === ""){
                
                console.log(this.formValues);
                swal("Registration Successful", " Thank You " + this.formValues.username, "success").then(() => {
                    console.log(this.formValues)
                    this.removeInputs()
                });
            }

            else {
                swal("Please Check the Inputs","Click ok to Continue" ,"error");
            }
        }

        removeInputs(){
            const form_groups = document.getElementsByClassName('form-group')
            Array.from(form_groups).forEach(element => {
                element.getElementsByTagName('input')[0].value = ""
                element.getElementsByTagName('span')[0].textContent = ""
                element.classList.remove('success')
            })
        }

}



// Lets Create an Object for the class : FormValidation.

let ValidateUserInputs = new FormValidation();


document.getElementsByClassName("form")[0].addEventListener("submit", (event) => {

    event.preventDefault()
    ValidateUserInputs.getInputs()
    ValidateUserInputs.validateUsername()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePhonenumber()
    ValidateUserInputs.alertMessage()
})

