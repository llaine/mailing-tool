var mockTitlesStylePicker = {
  'font-size': 18 + 'px',
  'font-family': 'Times News Roman',
  color:'#FFFFF',
  'font-weight': 'normal',
  'line-height': '2'
};

var mockParamsTitles = {
  fontSize: 18 + 'px',
  fontFamily: 'Times News Roman',
  color:'#FFFFF',
  fontWeight: 'normal',
  lineHeight: '2'
};

var mockBackgroundStylePicker = {
  bgColor:'#000000',
  borderSize:'2px',
  borderType:'dotted',
  borderColor:'blue'
};

var mockParamsBackground = {
  background: '#000000'
};

var mockParagraphStylePicker = {
  color: 'black',
  fontSize: 13 + 'px',
  fontFamily: 'Times',
  'line-height':'10'
};

var mockParamsParagraph = {
  color: 'black',
  'font-size': 13 + 'px',
  'font-family': 'Times',
  'line-height':undefined
};

var mockParamsImg = {
  'margin-top':'10%',
  'margin-left':'10%'
};

var mockLinkStylePicker = {
  color: '#00000',
  fontSize: 12 + 'px',
  fontFamily: 'Arial'
};

var mockLayoutStylePicker = {
  blockDouble: {layout: 'Two third', value: '200-800'},
  images: {
    margin: {
      left: 10,
      top: 10,
      right: 10,
      bottom: 10
    },
    width: 50
  }
};

/**
 * Créer une table avec le block dans la table.
 * @param block
 * @returns {Node}
 */
var mockCreateTable = function(block) {
  var t = document.createElement('table');
  var tr = document.createElement('tr');
  var td = document.createElement('td');

  td.appendChild(block.toString());
  tr.appendChild(td);
  t.appendChild(tr);

  return t;
};