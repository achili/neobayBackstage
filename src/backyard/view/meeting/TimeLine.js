/**
 * Created by Matring on 1/10/17.
 */

export default function TimeLine($) {
  let $doc = $(document);
  let _TimeLine = 'timeline';
  let _Action = "pick";
  let _Click = "clicked";

  $.fn[_TimeLine] = function (screenings) {
    let $dom = $(this);
    let line = $dom.find('.meetinGrooMlinEiteM');
    if (line.length !== 0){
      if (screenings.length !== 0){


        for (let j = 0; j < screenings.length; j++){
          if (screenings[j].status !== 'REJECT'){
            if (screenings[j].status === 'OK'){
              for (let i = screenings[j].beginTime - 16; i < screenings[j].endTime - 16; i++){
                line[i].style.backgroundColor = '#fba3b9';
              }
            }else{
              for (let i = screenings[j].beginTime - 16; i < screenings[j].endTime - 16; i++){
                line[i].style.backgroundColor = '#fba3b9';
              }
            }
          }
        }
      } else {
        for (let item of line){
          item.style.backgroundColor = '#c1f9ae';
        }
      }
    }
    }


  // $.fn[_Click] = function (n) {
  //   let $dom = $(this);
  //   let line = $dom.find('.meetinGrooMlinEiteM');
  //   for (let item of line){
  //     item.style.backgroundColor = '#c1f9ae';
  //   }
  //   line[n - 1].style.backgroundColor = '#9be3f9';
  // }

  $.fn[_Action] = function (screenings) {
    if (screenings !== null){
      let line = $doc.find('.meetinGrooMlinEiteM');
      for (let i = screenings.beginTime - 16; i < screenings.endTime - 16; i++){
        line[i].style = 'background-color: #fb1680';
      }
    }
  }

}
