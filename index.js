function togglePopup(){
  //najde vyskakovaci menu s klasem popup-        toogle active- vyskoci nam tlacitko na zavreni menu 
  document.getElementById("popup-1").classList.toggle("active");
}



//nastaveni kdy countdown skonci    
let launchDate = new Date("June 28, 2024 12:00:00").getTime();
    
    //kazdou sekundu nam ubyde 1 sekunda
    let timer = setInterval(tick, 1000);

    function tick () {
      //zjisti kolik je ted hodin
      let now = new Date().getTime();

      //zjisti rozdil mezi aktualnim casem a casem kdy ma countdown skoncit 
      let t = launchDate - now;


      //kontrouje jestli cas uz neuprchnul cas vesti nez 0 nebo mensi
      if (t > 0) {

        //nastaveni dnu, hodin, sekund, minut
        //algoritm pro vypocet dnu
        let days = Math.floor(t / (1000 * 60 * 60 * 24));

        //prefix jakeho koliv cisla nize 10 s "0" např. 1 = 01
        //neco chytryho
        if (days < 10) { days = "0" + days; }
        
        //algoritm pro vypocet hodin
        let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours < 10) { hours = "0" + hours; }

        //algoritm pro vypocet minut
        let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        if (mins < 10) { mins = "0" + mins; }


        //algoritm pro vypocet sekund
        let seconds = Math.floor((t % (1000 * 60)) / (1000));
        if (seconds < 10) { seconds = "0" + seconds; }


        //vytvori casovy retezec
        let time = `${days} : ${hours} : ${mins} : ${seconds}`;

        //nastavi cas dokumentut
        document.querySelector('.countdown').innerText = time;
      }
    }	


  //nastaveni pro otevirani a zavirani sadebaru
    function openSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'flex'
    }

    function closeSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'none'
    }




  //nastaveni funkcnosti formulare
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      let formData = new FormData(this);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'process_booking.php', true);
      xhr.onload = function() {
          if (xhr.status === 200) {
              document.getElementById('message').innerHTML = xhr.responseText;
          } else {
              document.getElementById('message').innerHTML = 'Chyba, zkuste znovu';
          }
      };
      //kontroluje datum nez posle data
      let dateInput = document.getElementById('date');
      let selectedDate = new Date(dateInput.value);
      let today = new Date();
      today.setHours(0, 0, 0, 0); // definuje cas na 00:00:00
      let preference = document.getElementById('preference').value;
      let day = selectedDate.getDay(); // 0 = nedele, 1 = pondeli, ..., 6 = sobota
  
  
      //to jsem moc nevychytal
      //na strance nejde videt jaky dny muzu vybrat pro degustaci vina a jake dny pro degustaci¨
      //takze degustace je od pondeli do patku zatimco jenom v sobotu je vino 
      if (selectedDate < today) {
          alert('Nemůžete vybrat předchozí dny.');
          return;
      }
  
      if ((preference === 'food' && (day === 0 || day === 6)) || (preference === 'wine' && day !== 6)) {
          alert('Neplatné datům podle vybrané preference, vyberte jiné.');
          return;
      }
  
      if (day === 0) {
          alert('Na neděli jsou rezervace nedostupné.');
          return;
      }
  
      xhr.send(formData);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
      let dateInput = document.getElementById('date');
      let today = new Date();
      today.setHours(0, 0, 0, 0); // definuje cas na 00:00:00
  
      let yyyy = today.getFullYear();
      let mm = String(today.getMonth() + 1).padStart(2, '0'); // mesic zacina s 0
      let dd = String(today.getDate()).padStart(2, '0');
      let minDate = `${yyyy}-${mm}-${dd}`;
      dateInput.setAttribute('min', minDate);
  
      dateInput.addEventListener('input', function() {
          let selectedDate = new Date(this.value);
          let preference = document.getElementById('preference').value;
          let day = selectedDate.getDay(); // 0 = nedele, 1 = pondeli, ..., 6 = sobota
  
          //kontroluje jestli jsme nevybrali prosle dny, jestli je ted 5 june tak nemuzem vybrat 4 
          if (selectedDate < today) {
              alert('Nemůžete vybrat předchozí dny.');
              this.value = '';
              return;
          }
          //kontroluje jestli jsou pracovni dny nebo vikend
          if ((preference === 'food' && (day === 0 || day === 6)) || (preference === 'wine' && day !== 6)) {
              alert('Neplatné datům podle vybrané preference, vyberte jiné.');
              this.value = '';
              return;
          }
  
          // blokuje rezervace na nedeli
          if (day === 0) {
              alert('Na neděli jsou rezervace nedostupné.');
              this.value = '';
              return;
          }
      });
  
      document.getElementById('preference').addEventListener('change', function() {
          dateInput.dispatchEvent(new Event('input'));
      });
  
      document.getElementById('phone').addEventListener('input', function() {
          this.value = this.value.replace(/[^0-9]/g, '');
      });
  });
  