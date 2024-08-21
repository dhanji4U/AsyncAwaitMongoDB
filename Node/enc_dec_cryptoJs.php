<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">

    <title>Encryption & Decryption ReactJS</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh57Xc0jk=" crossorigin="anonymous"></script>

    <style type="text/css">
        ::selection {
            background-color: #E13300;
            color: white;
        }

        ::-moz-selection {
            background-color: #fff;
            color: black;
        }

        body {
            background-color: #fff;
            margin: 40px;
            font: 13px/20px normal Helvetica, Arial, sans-serif;
            color: black;
        }

        p {
            overflow-wrap: break-word;
            font-size: medium;
        }

        a {
            color: #003399;
            background-color: transparent;
            font-weight: normal;
        }

        h1 {
            color: black;
            background-color: transparent;
            border-bottom: 1px solid #D0D0D0;
            font-size: 19px;
            font-weight: normal;
            margin: 0 0 14px 0;
            padding: 14px 15px 10px 15px;
        }

        textarea {
            font-size: 15px;
            color: black;
            background: #fff;
            width: 100%;
        }

        code {
            font-family: Consolas, Monaco, Courier New, Courier, monospace;
            font-size: 12px;
            background-color: #f9f9f9;
            border: 1px solid #D0D0D0;
            color: #002166;
            display: block;
            margin: 14px 0 14px 0;
            padding: 12px 10px 12px 10px;
        }

        .button {
            margin: 10px 0 0 -5px;
        }

        #body {
            margin: 15px;
        }

        .btn {
            border-radius: 5px !important;
            text-transform: uppercase;
            font-weight: bold !important;
        }

        p.footer {
            text-align: right;
            font-size: 11px;
            border-top: 1px solid #D0D0D0;
            line-height: 32px;
            padding: 0 10px 0 10px;
            margin: 20px 0 0 0;
        }

        #container {
            margin: 10px;
            border: 1px solid #D0D0D0;
            /* box-shadow: 0 0 8px #D0D0D0;  */
        }
    </style>
</head>

<body>

    <div id="container">
        <h1><b>Encryption & Decryption ReactJS</b></h1>

        <div id="body">
            <form class='form-horizontal' role='form' id='poster_add' name='poster_add' enctype='multipart/form-data' action="enc_dec_cryptoJs.php" method="POST">
                <div class="col-md-12">
                    <label><b>Text or Encryption</b></label><br>
                    <textarea name="data" id="data" required="" rows="10"></textarea>
                    <br>
                </div>

                <div class="row">
                    <div class="btn-group button" style="width: 36%;">
                        <input type="submit" name="type" class="btn btn-success m-1 btn-sm col-1" value="encrypt">
                        <input type="submit" name="type" class="btn btn-success m-1 btn-sm col-1" value="decrypt">
                        <input type="reset" name="reset" class="btn btn-danger m-1 btn-sm col-1" value="Clear">
                    </div>
                </div>
                <br>
            </form>
        </div>
    </div>

</body>
<script type="text/javascript">
    function CopyToClipboard(containerid) {
        var container = document.getElementById(containerid);
        if (!container) return;

        container.style.display = "block";
        var range = document.createRange();
        range.selectNode(container);
        window.getSelection().addRange(range);

        navigator.clipboard.writeText(container.innerText).then(function() {
            window.getSelection().removeAllRanges();
            var successMessage = document.createElement("div");
            successMessage.innerHTML = "Copied Successfully!";
            successMessage.style.backgroundColor = "green";
            successMessage.style.color = "white";
            successMessage.style.padding = "10px";
            successMessage.style.position = "fixed";
            successMessage.style.top = "50%";
            successMessage.style.left = "50%";
            successMessage.style.transform = "translate(-50%, -50%)";
            document.body.appendChild(successMessage);
            setTimeout(function() {
                successMessage.remove();
            }, 2500);
        }, function(err) {
            console.error('Failed to copy text: ', err);
        });
    }
</script>

</html>

<script type="text/javascript" src="config/constants.js"></script>
<script>
    document.cookie = "iv   = " + Globals.IV;
    document.cookie = "key  = " + Globals.KEY;
    document.cookie = "app_name  = " + Globals.APP_NAME;
</script>
<!-- witecoller -->
<!-- 9abb08f8a3faf3b9ddd0d48e434f5afee317b0b884a665cc501a65d0a61747b8 -->

<?php

$encryptionMethod = 'AES-256-CBC';
$secret = utf8_encode('LAsc3Si9dZHHMaNmOtPKsdfyoKwi5ChNm');
$iv  = utf8_encode('LAsc3Si9dZHfdaNm');

if (isset($_REQUEST['type']) && isset($_REQUEST['data']) && $_REQUEST['data'] != '') {

    if ($_REQUEST['type'] == 'encrypt') {
        $plaintext = trim($_REQUEST['data']);
        $decrypt_value = $_REQUEST['data'];
        $encrypt_value = openssl_encrypt($plaintext, $encryptionMethod, $secret, OPENSSL_RAW_DATA, $iv);
        $encrypt_value = base64_encode($encrypt_value); ?>

        <div id='container'>
            <div id='body'>
                <h5 onclick="CopyToClipboard('p1')" style='cursor: pointer;'><b>COPY HASH </b><button class='btn btn-outline-danger btn-sm' onclick="CopyToClipboard('p1')" style='font-size: 11px;' type='button'><i class='bi bi-clipboard'></i></button></h5>
                <p id='p1'><?php echo $encrypt_value ?></p>
                <h5><b>For Dev</b></h5><textarea rows='5'><?php echo $encrypt_value ?></textarea>
                <h5 onclick="CopyToClipboard('p2')" style='cursor: pointer;'><b>COPY ORIGINAL </b><button class='btn btn-outline-danger btn-sm' onclick="CopyToClipboard('p2')" style='font-size: 11px;' type='button'><i class='bi bi-clipboard'></i></button></h5>
                <p id='p2'><?php echo $decrypt_value ?></p>
                <h5 style='cursor: pointer;'><b>JSON </b></h5>
            </div>
        </div>";
    <?php
        die();
    } else {

        $enc = $_REQUEST['data'];
        $enc = base64_decode($enc);

        $decrypt_value = openssl_decrypt($enc, $encryptionMethod, $secret, OPENSSL_RAW_DATA, $iv);
        $encrypt_value = $_REQUEST['data'];
    ?>

        <div id='container'>
            <div id='body'>
                <h5 onclick="CopyToClipboard('p1')" style='cursor: pointer;'><b>COPY HASH </b><button class='btn btn-outline-danger btn-sm' onclick="CopyToClipboard('p1')" style='font-size: 11px;' type='button'><i class='bi bi-clipboard'></i></button></h5>
                <p id='p1'><?php echo $encrypt_value ?></p>
                <h5 onclick="CopyToClipboard('p2')" style='cursor: pointer;'><b>COPY ORIGINAL </b><button class='btn btn-outline-danger btn-sm' onclick="CopyToClipboard('p2')" style='font-size: 11px;' type='button'><i class='bi bi-clipboard'></i></button></h5>
                <p id='p2'><?php echo $decrypt_value ?></p><br>
                <h5>For Dev</h5><textarea rows='5'><?php echo $decrypt_value ?></textarea>
                <h5 style='cursor: pointer;'>JSON</h5>";
                <?php print_r(json_decode($decrypt_value)); ?>
            </div>
        </div>;
<?php }
}

?>