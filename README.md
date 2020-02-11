# ftc2020

- `https://ftc2020.herokuapp.com`

## Scope & User story
`FTC2020 SCOPE

- The root/base url of the app should render a signup form with fields for firstname, lastname, email, password. When the form is submitted, make a POST call to /api/v1/auth/signup with the data. On success, a Response.status value is true and you can show the corresponding message. If signup is fine, the user would be required to verify email by clicking the link in his email. 

- The verify link makes a GET call to /api/v1/auth/verify/:token. If the token is valid for the email, the isVerified field in the user model is turned true and user can login. So, this page should render a .message div #verifyComponent
The login page should render a form with email and password fields. On submit, make  POST call to /api/v1/login with the data. Check the Response.status and if it's true, redirect to dashboard #loginComponent

- A GET request to /dashboard should render the dashboard component. Here, alot of conditional rendering will be done as the user would be updating his records. On the top will be links/buttons to Personal, Work, NOK, Choir Roles corresponding to various sections of the data to be updated etc
When a user clicks on, for instance, personal ,re render the #dashboard with the form containing fields for personal data #personalDataComponent. All fields should be required. When this form is filled, make a PATCH request to /api/v1/auth/:userId/:section with the fields. The userId is available on login and kept in session. The valid section are personal, nok, choir_roles. 

- On the dashboard, depending on the state of isAdmin that comes with the login, render an #AdminLinksComponent with links to view users. 
When the viewUser link is clicked by Admin, make a GET request to /users. This route is protected hence add an Authorization header to the request Bearer <token>. The token is sent at login. 
`

## Model
### `users`
<pre><code>
{
  "unit_id":  "FTCHR0009",
  "title": "Mr",
  "firstname": "Samuel",
  "lastname": "Chibueze",
  "email": "chelson4real@gmail.com",
  "password": "godCanTellU",
  general: {
    "group": "89",
    "vocal_part": "Alto",
    "rehearsal_location": "Iyana",
    "gender": "male"
  },
  personal: {
    "phone": "09060402887",
    "whatsapp_phone":  "09060402887",
    "email": "ftc@lfcww.org",
    "contact_address": "KM 10 Idiroko Road, Ota",
    "pha": "Ikotun",
    "dob": "36-12",
    "wed_date": "23-65",
    "marital_status": "married",
    "work_status": "employed",
    "profession": "code instructor",
    "employer_name": "LFC",
    "employer_address": "36 Idiroko Road, Ikotun",
    "state_origin": "Abia",
    "nationality": "Nigeria"
  },
  nok: {
    "name": "Kingdom Advancement Prayer",
    "address": "Sango Ota",
    "phone": "0874569845",
    "occupation": "Pastor",
    "relation": "Coach",
    "email": "pastor@gmail.com"
  },
  choir_roles: {
    "membership_status": "member",
    "leadership_status": "choir master",
    "sub_group": "music team"
  },
  church_info: {
    "wsf_status": "home provider",
    "new_birth_year": "2006",
    "holy_spirit_year": "2009",
    "lfc_joined_year": "2017",
    "ordination_year": "2012",
    "province": "42",
    "district": "5",
    "zone":"1"
  }
}
</code></pre>
## Endpoints/Routes

- POST `/api/v1/auth/signup`
<pre><code>
Request.body :{
    "firstname": "Samuel",
    "lastname": "Chibueze",
    "email": "validemail@gmail.com",
    "password": "lfccanaanland"
}
</code>
</pre>
<pre><code>
Response:
{
    "status": true,
    "message": "User signup successfully",
    "data": {
        "personal": {
            "nationality": "Nigeria"
        },
        "isVerified": false,
        "isAdmin": false,
        "isGroupAdmin": false,
        "createdAt": "2020-02-11T17:24:44.303Z",
        "_id": "5e42e46d06da1723f033b8e3",
        "firstname": "Wiz",
        "lastname": "Ainna",
        "email": "validemail@gmail.com",
        "password": "$2a$10$EEdzoHwTQGw8Ec5FTx7a5OtZmpHkzzedCLGQCMmO1kS4/Ac4pm5tO",
        "updatedAt": "2020-02-11T17:24:44.303Z",
        "__v": 0
    }
}
</code></pre>

- `GET /api/v1/auth/verify/:token`
<pre><code>
{
status: true,
message: "The account has been verified. Please log in."
}
</code></pre>


- `POST /api/v1/auth/login`
<pre><code>
{
 "email": "validemail@gmail.com",
  "password": "lfccanaanland"
}
</code></pre>


<pre><code>
Response: 
{
    "status": true,
    "message": "login - data complete ",
    "email": "lightworthng@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUzZDg4NWQ3MDhjNzkxOThjYzA5ZWVmIn0sImlhdCI6MTU4MTA5MTM2MiwiZXhwIjoxNTgxMDk0OTYyfQ.zj_o4HzINFmSockL9z4gPyWuIXCRdTNiBLCJEjz2xnA"
}
</code></pre>


- `GET /api/v1/auth/users`

<pre><code>
{
    "status": true,
    "message": "FTC2020 is running",
    "data": [
        {
            "personal": {
                "nationality": "Nigeria"
            },
            "isVerified": false,
            "isAdmin": false,
            "isGroupAdmin": false,
            "createdAt": "2020-02-05T15:41:59.556Z",
            "_id": "5e3ae2678aef59142ca53d85",
            "firstname": "Samuel",
            "lastname": "Chibueze",
            "email": "xyz@gmail.com",
            "password": "$2a$10$eEr7YQM5qel8o1Pd1.PsEeh7.Iqh7wwGqyFj3hdqPD.cMrnZARLCS",
            "updatedAt": "2020-02-05T15:41:59.556Z",
            "__v": 0
        },
        {
            "personal": {
                "nationality": "Nigeria"
            },
            "isVerified": false,
            "isAdmin": false,
            "isGroupAdmin": false,
            "createdAt": "2020-02-07T14:06:07.354Z",
            "_id": "5e3d79f6a069c20017f8b86e",
            "firstname": "Wiz",
            "lastname": "Ainna",
            "email": "Wizkevinaaina@gmail.com",
            "password": "$2a$10$runS/X9swk7Am/ShdupIrOy3a.mggosFyhA1qVst/F5GlXgYsrR36",
            "updatedAt": "2020-02-07T14:06:07.354Z",
            "__v": 0
        },
        {
            "personal": {
                "nationality": "Nigeria"
            },
            "isVerified": false,
            "isAdmin": false,
            "isGroupAdmin": false,
            "createdAt": "2020-02-07T14:06:07.354Z",
            "_id": "5e3d7a46a069c20017f8b870",
            "firstname": "Wiz",
            "lastname": "Ainna",
            "email": "wizkevinaaina@gmail.com",
            "password": "$2a$10$RJfY8JCpkY2MfSjmCvwUuOJ3skZdY3RhSQC.rDVhceMNiJw0VQ.pi",
            "updatedAt": "2020-02-07T14:06:07.354Z",
            "__v": 0
        }
    ]
}
</code></pre>

`PATCH /api/v1/auth/user/:userId/:section`


Sections: Any of: nok, church_info, choir_roles, personal, general

<pre><code>
Request: {
    "wsf_status": "home provider",
    "new_birth_year": "2006",
    "holy_spirit_year": "2009",
    "lfc_joined_year": "2017",
    "ordination_year": "2012",
    "province": "42",
    "district": "5",
    "zone":"1"
  }
</code></pre>

 <pre><code>
  Response: {
    "status": true,
    "message": "Updating church_info of 5e3c2f92ef857c160c0a39af"
}</code></pre>
 <pre><code></code></pre>

 - `DELETE api/v1/auth/user/ïd`
 <pre><code>
 {
    "message": "User deleted",
    "data": {
        "n": 1,
        "opTime": {
            "ts": "6790688511562350653",
            "t": 35
        },
        "electionId": "7fffffff0000000000000023",
        "ok": 1,
        "operationTime": "6790688511562350653",
        "$clusterTime": {
            "clusterTime": "6790688511562350653",
            "signature": {
                "hash": "pEtF5DESqZjzb757ml7EOur5sV8=",
                "keyId": "6760683809902952449"
            }
        },
        "deletedCount": 1
    }
}
</code></pre>


 - `GET api/v1/auth/users/:id`
<pre><code>
Response: 
{
    "status": true,
    "message": "User found",
    "data": {
        "personal": {
            "nationality": "Nigeria"
        },
        "isVerified": false,
        "isAdmin": false,
        "isGroupAdmin": false,
        "createdAt": "2020-02-05T15:41:59.556Z",
        "_id": "5e3ae2678aef59142ca53d85",
        "firstname": "Samuel",
        "lastname": "Chibueze",
        "email": "xyz@gmail.com",
        "password": "$2a$10$eEr7YQM5qel8o1Pd1.PsEeh7.Iqh7wwGqyFj3hdqPD.cMrnZARLCS",
        "updatedAt": "2020-02-05T15:41:59.556Z",
        "__v": 0
    }
}</code></pre>

- `GET api/v1/auth/dashboard`
  headers.Authorization : Bearer `<token>`<pre><code>Response: 
{
    "status": true,
    "data": {
        "personal": {
            "nationality": "Nigeria"
        },
        "isVerified": true,
        "isAdmin": false,
        "isGroupAdmin": false,
        "createdAt": "2020-02-07T15:50:29.392Z",
        "_id": "5e3d885d708c79198cc09eef",
        "firstname": "Wiz",
        "lastname": "Ainna",
        "email": "lightworthng@gmail.com",
        "password": "$2a$10$36H939B/2lo.Ea6tK/k7Ser4r1OpaOANcg3pUPlLGS0gXnYlrSsVS",
        "updatedAt": "2020-02-07T16:01:28.573Z",
        "__v": 0
    }
}
</code></pre>

## TODO

- Add feature to resend email verification token incase of loss or delay

- Allow user to login in without verification but restrict edit access

- Email sent with localhost but not with heroku
 