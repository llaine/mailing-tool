var mockTitlesStylePicker = {
  'font-size': 18 + 'px',
  'font-family': 'Times News Roman',
  color:'#FFFFF',
  'font-weight': 'normal',
  'line-height': '2'
};

var mockBackgroundStylePicker = {
  bgColor:'#000000',
  borderSize:'2px',
  borderType:'dotted',
  borderColor:'blue'
};

var mockParagraphStylePicker = {
  color: 'black',
  fontSize: 13 + 'px',
  fontFamily: 'Times'
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