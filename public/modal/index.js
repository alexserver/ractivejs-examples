Modal = Ractive.extend({
  // all Modal instances will share a template (though you can override it
  // on a per-instance basis, if you really want to)
  template: "#rs-modal-template",

  // the init function will be called as soon as the instance has
  // finished rendering
  init: function () {
    var self = this, resizeHandler;

    // store references to the background, and to the modal itself
    // we'll assume we're in a modern browser and use querySelector
    this.outer = this.find( '.modal-outer' );
    this.modal = this.find( '.modal' );

    this.on( 'okay', function () {
      this.teardown();
    });

    // if the user taps on the background, close the modal
    this.on( 'close', function ( el ) {
      if ( !this.modal.contains( el.original.target ) ) {
        this.teardown();
      }
    });

    // when the window resizes, keep the modal horizontally and vertically centred
    window.addEventListener( 'resize', resizeHandler = function () {
      self.center();
    }, false );

    // clean up after ourselves later
    this.on( 'teardown', function () {
      window.removeEventListener( 'resize', resizeHandler );
    }, false );

    // manually call this.center() the first time
    this.center();
  },

  center: function () {
    var outerHeight, modalHeight, verticalSpace;

    // horizontal centring is taken care of by CSS, but we need to
    // vertically centre
    outerHeight = this.outer.clientHeight;
    modalHeight = this.modal.clientHeight;

    verticalSpace = ( outerHeight - modalHeight ) / 2;

    this.modal.style.top = verticalSpace + 'px';
  }
});

var showModal = function(msg){

  // We can now instantiate our modal
  basicModal = new Modal({
    // by default, the modal should sit atop the <body>...
    el: document.body,

    // ...but it should append to it rather than overwriting its contents
    append: true,

    partials: {
      modalContent: msg
    }
  });

};

document.querySelector(".showmodal").onclick = function(){
  showModal("hello enfermera");
  return false;
};