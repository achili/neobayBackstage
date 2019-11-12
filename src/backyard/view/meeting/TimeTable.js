

export default function TimeLine($) {

  let _TimeTable = 'timetable';


  $.fn[_TimeTable] = function (date,records,callback) {

    let $dom = $(this);
    let table = $dom.find('.meetinGrecorDiteM');
    let today = new Date();


    let tableArray = new Array(table.length);
    for (let i = 0; i < table.length; i++){
      tableArray[i] = 0;
      table[i].style.height = '150px';
    }

    let firstDate = new Date(date);
    firstDate.setDate(1);
    let weekday = firstDate.getDay();

    for (let i = (weekday + 6) % 7; i < table.length; i++){
      if (firstDate.getMonth() !== date.getMonth()){
        table[i].style = 'background-color: #bebebe';
      } else {
        table[i].style = 'background-color: #ffffff';
      }

      table[i].innerHTML = '<h3 class="text-right">' + (firstDate.format('MM-dd')) + '</h3>';
      firstDate.setDate(firstDate.getDate() + 1);
    }

    if ((date.getMonth() === today.getMonth()) && (date.getYear() === today.getYear())){
      table[today.getDate() + (weekday + 6) % 7 - 1].style.backgroundColor = '#f8ffa4';
    }

    date.setDate(1);
    date.setDate(date.getDate() - (weekday + 6) % 7);
    for (let i = 0; i < (weekday + 6) % 7; i++){

      table[i].style = 'background-color: #bebebe';
      table[i].innerHTML = '<h3 class="text-right">' + (date.format('MM-dd')) + '</h3>';
      date.setDate(date.getDate() + 1);

    }

    if (records !== null){
      for (let i = 0; i < records.length; i++){
        let day = new Date(records[i].date);
        if (records[i].status !== 'REJECT'){

          if (records[i].status === 'OK'){
            let newElement = $('<div class="text-left meetinGrecorDiteMtexTreviewinG"><span class="ml5">' + records[i].teamName + '团队:</span><div class="text-center">' + (records[i].beginTime - records[i].beginTime % 2) / 2 + ':' + records[i].beginTime % 2 * 3 + '0' + '-' + (records[i].endTime - records[i].endTime % 2) / 2 + ':' + records[i].endTime % 2 * 3 + '0' + '</div>' + '</div>');
            newElement.click(function () {
              callback(records[i].id);
            })
            newElement.appendTo(table[day.getDate() + (weekday + 6) % 7 - 1]);
          }else{
            let newElement = $('<div class="text-left meetinGrecorDiteMtexT"><span class="ml5">' + records[i].teamName + '团队:</span><div class="text-center">' + (records[i].beginTime - records[i].beginTime % 2) / 2 + ':' + records[i].beginTime % 2 * 3 + '0' + '-' + (records[i].endTime - records[i].endTime % 2) / 2 + ':' + records[i].endTime % 2 * 3 + '0' + '</div>' + '</div>');
            newElement.click(function () {
              callback(records[i].id);
            })
            newElement.appendTo(table[day.getDate() + (weekday + 6) % 7 - 1]);
          }

          tableArray[day.getDate() + (weekday + 6) % 7 - 1] += 1;
        }

      }
    }

    for (let i = 0; i < table.length; i++){
      if (tableArray[i] > 3){
        for (let n in table[i]){
        }
        for (let j = i - i % 7; j < ((i - i % 7) / 7 + 1) * 7; j++){
          table[j].style.height = tableArray[i] * 45 + 'px';
        }
      }
    }


  }


}
