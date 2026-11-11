const $ = (s) => document.querySelector(s);
const modal = $("#modalBackdrop");
function showModal(title, eyebrow, html){$("#modalTitle").textContent=title;$("#modalEyebrow").textContent=eyebrow;$("#modalContent").innerHTML=html;modal.hidden=false;}
function closeModal(){modal.hidden=true;}
$("#modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#year").textContent=new Date().getFullYear();

const areaDetails = {
 "NPO Management": ["Community programmes","Beneficiary and volunteer interest forms","Project and donation information","Programme updates"],
 "Business Services": ["Business and service directory","Product and service enquiries","Customer and order management (admin)","Payment integration planned"],
 "Community": ["Community announcements","Upcoming events","Volunteer opportunities","Event registration"],
 "Education": ["Courses and training opportunities","Learner interest registration","Learning resources","Certificates (future feature)"]
};
document.querySelectorAll("[data-area]").forEach(btn=>btn.addEventListener("click",()=>{
 const area=btn.dataset.area, items=areaDetails[area];
 showModal(area,"EXPLORE THEMBELIHLE",`<p>Explore ${area.toLowerCase()} on Thembelihle.</p><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul><p class="admin-note">This prototype shows the planned service areas. Live listings and registrations will be connected to a secure database in the production version.</p><button class="btn btn-primary" id="areaJoin">Register interest</button>`);
 $("#areaJoin").addEventListener("click",()=>{closeModal();$("#joinForm").scrollIntoView({behavior:"smooth"});});
}));
$("#joinOpen").addEventListener("click",()=>$("#joinForm").scrollIntoView({behavior:"smooth"}));
$("#joinForm").addEventListener("submit",e=>{
 e.preventDefault();
 const data=Object.fromEntries(new FormData(e.currentTarget).entries());
 const records=JSON.parse(localStorage.getItem("thembelihle_interest")||"[]");
 records.push({...data,submittedAt:new Date().toISOString()});
 localStorage.setItem("thembelihle_interest",JSON.stringify(records));
 $("#formNotice").textContent="Thank you. Your interest has been saved on this device in this demo.";
 e.currentTarget.reset();
});
$("#adminOpen").addEventListener("click",()=>showModal("Administrator access","THEMBELIHLE ADMIN",`
 <p>Sign in to view the prototype dashboard.</p>
 <form id="adminForm" class="admin-form"><label>Username<input name="username" required autocomplete="username" placeholder="Enter username"></label><label>Password<input name="password" type="password" required autocomplete="current-password" placeholder="Enter password"></label><button class="btn btn-primary" type="submit">Sign in</button></form>
 <p class="admin-note"><b>Demo login:</b> username <code>admin</code> · password <code>Welcome123!</code><br>This demo login is not secure and must never be used for a live service.</p>`));
document.addEventListener("submit",e=>{
 if(e.target.id!=="adminForm")return;
 e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());
 if(d.username!=="admin"||d.password!=="Welcome123!"){alert("Incorrect demo login.");return;}
 const count=JSON.parse(localStorage.getItem("thembelihle_interest")||"[]").length;
 showModal("Admin dashboard","DEMO ADMINISTRATION",`<p>Welcome to the Thembelihle prototype dashboard.</p><div class="dashboard-list"><div class="dashboard-item"><span>Interest registrations on this device</span><b>${count}</b></div><div class="dashboard-item"><span>NPO management</span><b>Planned</b></div><div class="dashboard-item"><span>Business services</span><b>Planned</b></div><div class="dashboard-item"><span>Community events</span><b>Planned</b></div><div class="dashboard-item"><span>Education programmes</span><b>Planned</b></div></div><p class="admin-note">This is a local demonstration only. Records are stored in this browser and are not shared with administrators or other devices. Production requires secure authentication, server-side permissions and a hosted database.</p>`);
});
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
