import json
import smtplib


def lambda_handler(event, context):
    # sent_to is a list of emails to send to.
    send_email(event["sent_to"])
    return {"statusCode": 200, "body": "test"}


# SEND EMAIL FUNCTION
def send_email(sent_to):
    # Change the items with: ######Change Me#######
    gmail_user = "abecc2255@gmail.com"
    gmail_app_password = "qbkwmbxcabspqvue"
    sent_from = gmail_user
    sent_to = sent_to
    sent_subject = "Skate Fast"
    sent_body = "Eat Ass"

    email_text = """\
From: %s
To: %s
Subject: %s
%s
""" % (
        sent_from,
        ", ".join(sent_to),
        sent_subject,
        sent_body,
    )

    try:
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.ehlo()
        server.login(gmail_user, gmail_app_password)
        server.sendmail(sent_from, sent_to, email_text.encode("utf-8"))
        server.close()
        print(email_text)
        print("Email sent!")
    except Exception as exception:
        print("Error: %s!\n\n" % exception)
