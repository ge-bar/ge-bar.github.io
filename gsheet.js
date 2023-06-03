const API_URL = 'https://script.google.com/macros/s/AKfycbyENR2vUgxEDOGBacrWllfaNrM1XsgwHt1H-L_rfTgQhSodw6cu6subjVokQRJDZzbCVw/exec';

function envoiCommande(record) {
    console.log(record);
    var jqxhr = $.ajax({
        url: API_URL,
        method: "GET",
        crossDomain: true,
        dataType: "json",
        data: record
      });
  }