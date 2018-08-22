$(function () {
    $('#CheckAll').click(function () {
        $('.checkOne').prop('checked', this.checked);
    });

    $('.checkOne').click(function () {
        let flag = true;
        $('.checkOne').each(function () {
            if (!this.checked) {
                flag = false;
            };
        });
        $('#CheckAll').prop('checked', flag);
        return false;
    });

    $('.del').click(function () {
        let msg = '您确认要删除下列数据？\n\n';
        msg += $('#' + this.name + '>td:first').next().html() + '\n';
        if (confirm(msg) == true) {
            const pointer = this;
            $('#' + pointer.name).css('background-color', 'red');
            $.post('/admin/products/del', {
                name: this.name
            }, function (data, status) {
                $('#' + pointer.name).fadeOut(500).remove();
            });
        } else {
            return false;
        };
        return false;
    });

    $('.delMany').click(function () {
        let msg = '您确认要删除下列数据？\n\n';
        let flag = false;
        let dataArray = [];
        let $selected = $('.checkOne:checked');
        $selected.each(function () {
            msg += $('#' + this.name + '>td:first').next().html() + '\n';
            dataArray.push(this.name);
            flag = true;
        });
        if (flag) {
            if (confirm(msg) == true) {
                $selected.parent().parent().css('background-color', 'red');
                data = dataArray.join();
                $.post('/admin/products/del', {
                    name: data
                }, function (data, status) {
                    $selected.parent().parent().fadeOut(500).remove();
                });
            }
        } else {
            alert('没有选择需要删除的数据，请先选择！');
            return false;
        };
        return false;
    });

    $('.edit').click(function () {
        $.post('/admin/products/edit', {
            name: this.name
        }, function (data, status) {
            $('#ajax').html(data);
            $('.action').html('<i class="fa fa-fw fa-lg fa-check-circle"></i>更新');
            let str='<tr><td>1</td><td><img class="default" src="" style="width:100%"></td><td><input class="form-control" type="text" placeholder="输入地址" value=""></td><td><button type="button" class="btn btn-danger imgDel">删除</button></td></tr>';
            $('body').on('click','.imgAdd',function () {
                $(str).clone(true).prependTo('.imgTbody');
            });
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
        return false;
    });

    $('.add').click(function () {
        $.post('/admin/products/add', null, function (data, status) {
            $('#ajax').html(data);
            $('.action').html('<i class="fa fa-fw fa-lg fa-check-circle"></i>增加');
            let str='<tr><td>1</td><td><img class="default" src="" style="width:100%"></td><td><input class="form-control" type="text" placeholder="输入地址" value=""></td><td><button type="button" class="btn btn-danger imgDel">删除</button></td></tr>';
            $('body').on('click','.imgAdd',function () {
                $(str).clone(true).prependTo('.imgTbody');
            });
            $('body,html').animate({
                scrollTop: 0
            }, 0);
        });
        return false;
    });
});