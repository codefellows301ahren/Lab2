'use strict';

/* get imgs and display on page
gets files from json using $.get()

create an object that has genearlly the below props

image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
      "title": "UniWhal",
      "description": "A unicorn and a narwhal nuzzling their horns",
      "keyword": "narwhal",
      "horns": 1
*/

function HornyBeasts (hornyBeast){
  this.image_url = hornyBeast.image_url;
  this.title = hornyBeast.title;
  this.description = hornyBeast.description;
  this.keyword = hornyBeast.keyword;
  this.horns = hornyBeast.horns;
}
HornyBeasts.allHornyBeasts = [];
HornyBeasts.optionsArry =[];

HornyBeasts.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let hornyBeastClone = $('div[class="clone"]');

  let hornyBeastHtml = $('#hornyBeast-template').html();

  hornyBeastClone.html(hornyBeastHtml);

  hornyBeastClone.find('h2').text(this.title);
  hornyBeastClone.find('img').attr('src', this.image_url).attr('alt', 'alt text');
  hornyBeastClone.find('p').text(this.description);
  hornyBeastClone.removeClass('clone');
  hornyBeastClone.attr('class', this.title);

  HornyBeasts.allHornyBeasts.forEach(element => {
    if(HornyBeasts.optionsArry.includes(element.keyword)){
      console.log('im already alive');
    }else{HornyBeasts.optionsArry.push(element.keyword);
      $('select').append(`<option value=${element.keyword}>${element.keyword}</option>`)
    }
  });
}


HornyBeasts.readJson = () => {
  console.log(HornyBeasts.allHornyBeasts);
  $.get('./page-1.json','json')
    .then(data => {
      console.log(data);
      data.forEach(item => {
        HornyBeasts.allHornyBeasts.push( new HornyBeasts(item))
      });
    })
    //render to the dom
    .then(HornyBeasts.loadHornyBeasts);
  
};

HornyBeasts.loadHornyBeasts = () => {
  HornyBeasts.allHornyBeasts.forEach(hornyBeast => hornyBeast.render());
};

$(() => HornyBeasts.readJson());