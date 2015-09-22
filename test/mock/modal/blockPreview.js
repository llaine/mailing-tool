var blockPreviewFromModalWithoutDouble = [
  {attributes:{}, content: '<p>Glisser ici un type de bloc</p>', type: 'text'},
  {attributes:{}, content: '<p>Glisser ici un type de bloc</p>', type: 'text'},
  {attributes:{}, content: '<p>Glisser ici un type de bloc</p>', type: 'text'}
];

var table = '<table style="width: 100%; table-layout: fixed;">' +
              '<tr>' +
                '<td style="width: 50%; word-wrap: break-word;">' +
                  '<p>Déposer votre contenu ici</p>' +
                '</td>' +
                '<td style="width: 50%; word-wrap: break-word;">' +
                  '<p>Déposer votre contenu ici</p>' +
                '</td>' +
              '</tr>' +
            '</table>';

var blockPreviewFromModalWithDouble = [
  {attributes:{}, content:table, type:'double'},
  {attributes:{}, content:table, type:'double'},
  {attributes:{}, content:table, type:'double'}
];

var blackStyle = {
  table:{
    border:'1px solid black',
    width:'100%',
    tableLayout: 'fixed'
  },
  background:{
    background:'#000000'
  },
  td: {
    background:'#FFF',
    padding: '15px',
    width:'100%'
  }
};

var whiteStyle = {
  table:{
    border:'1px solid white',
    width:'100%',
    tableLayout: 'fixed'
  },
  background:{
    background:'#ffffff'
  },
  td: {
    background:'#FFF',
    padding: '15px',
    width:'100%'
  }
};