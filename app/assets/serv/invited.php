<?PHP
    $message = '<html><body>';
    $message .= '<div style="background-color:#eee;padding:20px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;" >';
    $message .= '<div style="background-color:#40a3ff;padding:20px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;text-align:center;" >';
    
    $message .= '<img src="' . $i["adminphoto"] . '" style="-webkit-border-radius: 25px;-moz-border-radius: 25px;border-radius: 25px;height:50px;width:50px;background-color:#fff;margin-left:auto;margin-right:auto;" ></img>';
    $message .= '<br><span style="font-size:30px;color:#fff;">' . $i['admin'] . '</span><br><br>';
    $message .= '<span style="font-size:16px;color:#fff;">has invited you to join</span><br><br>';
    $message .= '<span style="font-size:30px;color:#fff;">' . $i['placename'] . '</span><br><br><br><br>';
    $message .= '<a href="http://flair.me/bus/serv/invited.php?i=' . $i["inviteid"] . '&c=' . $i["code"] . '" ><span style="background-color:#fff;padding:15px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;color:#40a3ff;" >View Invitation</span></a>';
    $message .= '</div></div>';
    $message .= '</body></html>';

    
    echo $message;
    
?>