$(document).ready(() => {
  $('.delete-todo').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type : 'DELETE',
      url : '/todo/delete/'+id,
      success : (response) => {
        alert('Deleting Todo');
        window.location.href = '/';
      },
      error : (error) => {
        console.log(error);
      }
    });
  });
  $('.todo-list-item').on('mouseenter', (e) => {
    $target = $(e.target);
    $childDisplay = $target.children('.todo-item-content');
    $siblingDisplay = $target.siblings('.todo-item-content');
    if ($childDisplay) {
      $target.children('.todo-item-content').show();
    } else if ($siblingDisplay) {
      $target.siblings('.todo-item-content').show();
    }
  });
  $('.todo-list-item').on('mouseleave', (e) => {
    $target = $(e.target);
    $childDisplay = $target.children('.todo-item-content');
    $siblingDisplay = $target.siblings('.todo-item-content');
    if ($childDisplay) {
      $target.children('.todo-item-content').hide();
    } else if ($siblingDisplay) {
      $target.siblings('.todo-item-content').hide();
    }
  });
});

function showDiv() {
  console.log('this');
  // $element = $('.')
  //   $target = $(e.target);
  //   $target.children('.todo-item-content').hide();
}
