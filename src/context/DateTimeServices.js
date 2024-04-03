export const conversiDateTimeIDN = (currentDate) => {
    var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var dateDataIDN = new Date(currentDate);
    var tanggal = dateDataIDN.getDate();
    var xhari = dateDataIDN.getDay();
    var xbulan = dateDataIDN.getMonth();
    var xtahun = dateDataIDN.getYear();
  
    var hari = hari[xhari];
    var bulan = bulan[xbulan];
    var tahun = xtahun < 1000 ? xtahun + 1900 : xtahun;
  
    var tglIDN = hari + ", " + tanggal + " " + bulan + " " + tahun;
    return tglIDN;
  };


  export const formatRupiah = (angka) => {

    var number_string = angka.toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
   
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
   
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    var prefix =  'Rp. ' + rupiah;
    return prefix
  }