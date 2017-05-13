

function getPremio(valor){
  $.gritter.removeAll();
  $("#premioValue").text(valor);
  $('#mobile-game-bar').css({'visibility' : 'visible'});

}
//Set contenido de un premio
function getContentNewPremio(cofre){
var newPremio = '<div class="modal-dialog modal-lg">'+
'<div class="modal-content notification-popup" modal-transclude="">'+
'<div id="bonusdaysrikemodal" class="bonus-day-srike-modal bonus-day-srike-modal-mobile ng-scope">'+
  '  <div class="modal-header-mobile">'+
  '      <button type="button" class="close" ng-click="ok()"></button>'+
  '      <h4 class="modal-title-mobile">¡Premio !</h4>'+
  '  </div>'+
  '  <div class="modal-body-mobile">'+
    '    <p>Enhorabuena has ganado este premio: </p>'+

  '      <div class="bg_visit_day_3">'+
  '                  <div class="visit_day_container visit_day_today" style="width: 100%; text-align: center; align-items:center; padding-left: 50%;">'+


    '                        <p class="reward-text daystreakmobile-bg" style="padding-top: 35px;font-size: 32px;margin-left: -115px;padding-right: 93px;text-align: right;">'+cofre.valor_premio+'</p>'+
    '                        <p style="position: absolute; width: 100px; margin-top: -175px; color: white; font-size: 16px; margin-left: -85px;">Día 3</p>'+
    '                        <p style="position: absolute;width: 100px;margin-top: -191px;color: white;font-size: 12px;margin-left: -85px;">Hoy</p>'+
    '                </div>'+
    '    </div>'+
  '  </div>'+

  '      <div style="position: absolute; width: 100%; display: block; margin-top: -25px; margin-left: 0px;">'+
  '          <button type="button" class="button button-md button-coins uppercase" onclick="getPremio(\''+cofre.valor_premio+'\')">Recoger</button>'+
  '      </div>'+

'</div>'+
'</div>'+
'</div>';

return newPremio;
}

//Set contenido de un cofre
function getContentCofre(cofre){
  var contentCofre = '<section class="content content-flyout content-flyout-right section-home-goplus">'+
'<div class="content--wrapper container-fluid js-parallax-parent-1">'+
    '<div class="content--movement-side js-parallax-child-1"></div>'+
    '<div class="content--flyout box box-dark box-flyout box-flyout-right box-text-large" data-scroll-animation="scroll-left">'+
        '<h2  style="font-size: 20px;"><i class="fa fa-globe" style="margin-right: 10px;"></i>'+cofre.titulo_pista+'</h2>'+
        '<p class="content--description">'+cofre.description+'</p>'+
        '<div class="news-list-item--more text-center-xs">'+
            '<a class="btnUD btnUD-sm-read-more" href="">'+cofre.boton_pista+
            '<img style="position: absolute;right: 4px;top: 0px;" class="nav-user-photo" src="img/play-button.png"/>'+
            '</a>'+
        '</div>'+
    '</div>'+
'</div>'+
'</section>';

return contentCofre;
}

//Set contenido de un premio
function getContentPremio(cofre){

  var contentPremio = '<div class="cofre-box">'+

                        '<div class="cofre-box-bg-mostPopular" style="width: 100%;">'+
                          '  <button class="cofre-box-button" style="width: 100%;">'+
                                '<div class="cofre-box-header-mostPopular">'+
                                '    <p>'+
                                '        <span style="font-size: 17px;">PREMIO</span>'+

                                '    </p>'+
                                '</div>'+

                              '  <div style="display: -webkit-flex; display: flex; height: 105px;" class="buy_coins_c_3">'+
                              '      <div class="cofre-offer-img mostPopular"></div>'+
                              '  </div>'+
                              '  <div style="width: 100%; margin-top: 5px;">'+
                              '      <div class="cofre-box-div-coins">'+
                              '          <div style="position: relative; left: -12px; float: left;">'+
                              '              <img src="img/coin_medium.png" class="cofre-box-coin-img" style="width: 45px;height:43px;" />'+
                              '          </div>'+
                              '          <div style="position: relative; float: left; left: -20px; margin-right: -20px; right: 0;">'+
                              '              <p class="cofre-box-coin-textbox" style="font-size: 22px;min-width: 140px;">&nbsp;&nbsp;'+cofre.valor_premio+'</p>'+
                              '          </div>'+
                              '      </div>'+
                              '      <div class="cofre-box-div-prize">'+
                              '          <br><p class="cofre-box-prize-textbox"></p>'+
                              '      </div>'+
                            '    </div>'+
                          '  </button>'+

                      '  </div>'+
                  '  </div><div class="news-list-item--more text-center-xs">'+
                      '<a style="text-align: center;width: 100%;" class="btnUD btnUD-sm-read-more" href="">'+cofre.boton_pista+
                      '<img style="position: absolute;right: 4px;top: 0px;" class="nav-user-photo" src="img/play-button.png"/>'+
                      '</a>'+
                  '</div>';

      return contentPremio;

}
