$(document).ready(() => {
  $('.delete-todo').on('click', (e) => {
    $target = $(e.target);
    const id = ($target.attr('data-id'))? $target.attr('data-id'): $target.parent().attr('data-id');
    console.log(id);
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
  $('.todo-list-item').on('click', (e) => {
    $target = $(e.target);
    $childDisplay = $target.children('.todo-item-content').css('display');
    $siblingDisplay = $target.siblings('.todo-item-content').css('display');
    if ($childDisplay && $childDisplay == 'none') {
      $target.children('.todo-item-content').show();
    } else if ($childDisplay && $childDisplay == 'block') {
      $target.children('.todo-item-content').hide();
    } else if ($siblingDisplay && $siblingDisplay == 'none' ) {
      $target.siblings('.todo-item-content').show();
    } else if ($siblingDisplay && $siblingDisplay == 'block' ) {
      $target.siblings('.todo-item-content').hide();
    }
  });
});
