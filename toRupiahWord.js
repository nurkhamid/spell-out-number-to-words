<script>
    var th_val = ['', 'RIBU', 'JUTA', 'MILYAR', 'TRILIUN'];

    var dg_val = ["NOL", "SATU", "DUA", "TIGA", "EMPAT", "LIMA", "ENAM", "TUJUH", "DELAPAN", "SEMBILAN"];
    var tn_val = ["SEPULUH", "SEBELAS", "DUA BELAS", "TIGA BELAS", "EMPAT BELAS", "LIMA BELAS", "ENAM BELAS", "TUJUH BELAS", "DELAPAN BELAS", "SEMBILAN BELAS"];
    var tw_val = ["DUA PULUH", "TIGA PULUH", "EMPAT PULUH", "LIMA PULUH", "ENAM PULUH", "TUJUH PULUH", "DELA[AN PULUH", "SEMBILAN PULUH"];

    function toRupiahWord(s) {
        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s))
            return 'not a number ';
        var x_val = s.indexOf('.');
        if (x_val == -1)
            x_val = s.length;
        if (x_val > 15)
            return 'too big';
        var n_val = s.split('');
        var str_val = '';
        var sk_val = 0;
        for (var i = 0; i < x_val; i++) {
            if ((x_val - i) % 3 == 2) {
                if (n_val[i] == '1') {
                    str_val += tn_val[Number(n_val[i + 1])] + ' ';
                    i++;
                    sk_val = 1;
                } else if (n_val[i] != 0) {
                    str_val += tw_val[n_val[i] - 2] + ' ';
                    sk_val = 1;
                }
            } else if (n_val[i] != 0) {
                //console.log(x_val - i);
                if (n_val[i] == 1 && (x_val - i) % 3 == 0) {
                    str_val += 'SERATUS' + ' ';
                } 
                else if (n_val[i] == 1 && (x_val - i) == 4) {
                    str_val += 'SERIBU' + ' ';
                } 
                else {
                    str_val += dg_val[n_val[i]] + ' ';
                    if ((x_val - i) % 3 == 0)
                        str_val += 'RATUS ';
                }
                sk_val = 1;
            }
            if ((x_val - i) % 3 == 1) {
                if (sk_val)
                    if (n_val[i] == 1 && (x_val - i)  == 4) {
                        str_val += ' ';
                    } else {
                        str_val += th_val[(x_val - i - 1) / 3] + ' ';
                    }
                sk_val = 0;
            }
        }
        if (x_val != s.length) {
            var y_val = s.length;
            str_val += 'point ';
            for (var i = x_val + 1; i < y_val; i++)
                str_val += dg_val[n_val[i]] + ' ';
        }
        return str_val.replace(/\s+/g, ' ');
    }

    document.getElementById("points").innerHTML = '<b> # ' + toRupiahWord(<?php echo $row['total_invoice']?>) + ' RUPIAH # </b>';
</script>
