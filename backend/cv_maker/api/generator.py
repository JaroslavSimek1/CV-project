from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.colors import Color
from django.conf import settings
import os
from io import BytesIO
import textwrap


class Generator():
    def generator_layout_0(user_profile):

        buffer = BytesIO()

        c = canvas.Canvas(buffer, pagesize=letter)

        photo_path = os.path.join(
            settings.BASE_DIR, user_profile.photo.url.lstrip('/'))

        name_height = 650

        c.drawImage(photo_path, x=450, y=name_height-inch,
                    width=1.5 * inch, height=1.5 * inch)

        c.setFont("Helvetica", 12)

        label_color = colors.HexColor('#4169E1')

        c.setFillColor(label_color)
        c.drawString(100, 650, "Full Name:")
        c.drawString(100, 630, "Email:")
        c.drawString(100, 610, "Phone:")
        c.drawString(100, 590, "About:")

        c.setFillColor(colors.black)

        c.drawString(
            200, 650, f"{user_profile.first_name} {user_profile.last_name}")
        c.drawString(200, 630, f"{user_profile.email}")
        c.drawString(200, 610, f"{user_profile.phone_number}")

        about_text = user_profile.about
        about_lines = textwrap.wrap(about_text, width=35)
        y_about = 590
        for line in about_lines:
            c.drawString(200, y_about, line)
            y_about -= 15

        y_position = 400
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Education:")
        c.setFillColor(colors.black)
        for education in user_profile.educations.all():
            c.drawString(
                200, y_position, f"{education.degree} at {education.school_name} ({education.graduation_year})")
            y_position -= 20

        y_position -= 20
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Experience:")
        c.setFillColor(colors.black)
        for experience in user_profile.experiences.all():
            c.drawString(
                200, y_position, f"{experience.job_title} at {experience.company_name} ({experience.start_date} - {experience.end_date})")
            y_position -= 20

        y_position -= 20
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Skills:")
        c.setFillColor(colors.black)
        skills_text = ', '.join(
            [skill.skill_name for skill in user_profile.skills.all()])
        c.drawString(200, y_position, skills_text)

        c.save()

        pdf_content = buffer.getvalue()
        buffer.close()

        return pdf_content

    def generator_layout_1(user_profile):

        buffer = BytesIO()

        c = canvas.Canvas(buffer, pagesize=letter)

        photo_path = os.path.join(
            settings.BASE_DIR, user_profile.photo.url.lstrip('/'))

        name_height = 650

        c.drawImage(photo_path, x=450, y=name_height-inch,
                    width=1.5 * inch, height=1.5 * inch)

        c.setFont("Helvetica", 12)

        label_color = colors.HexColor('#4169E1')

        c.setFillColor(label_color)
        c.drawString(100, 650, "Full Name:")
        c.drawString(100, 630, "Email:")
        c.drawString(100, 610, "Phone:")
        c.drawString(100, 590, "About:")

        c.setStrokeColor(Color(0.5, 0.5, 0.5, alpha=0.5))
        c.setLineWidth(150)
        c.line(100, 0, 100, 2000)

        c.setFillColor(colors.black)

        c.drawString(
            200, 650, f"{user_profile.first_name} {user_profile.last_name}")
        c.drawString(200, 630, f"{user_profile.email}")
        c.drawString(200, 610, f"{user_profile.phone_number}")

        about_text = user_profile.about
        about_lines = textwrap.wrap(about_text, width=35)
        y_about = 590
        for line in about_lines:
            c.drawString(200, y_about, line)
            y_about -= 15

        y_position = 400
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Education:")
        c.setFillColor(colors.black)
        for education in user_profile.educations.all():
            c.drawString(
                200, y_position, f"{education.degree} at {education.school_name} ({education.graduation_year})")
            y_position -= 20

        y_position -= 20
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Experience:")
        c.setFillColor(colors.black)
        for experience in user_profile.experiences.all():
            c.drawString(
                200, y_position, f"{experience.job_title} at {experience.company_name} ({experience.start_date} - {experience.end_date})")
            y_position -= 20

        y_position -= 20
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Skills:")
        c.setFillColor(colors.black)
        skills_text = ', '.join(
            [skill.skill_name for skill in user_profile.skills.all()])
        c.drawString(200, y_position, skills_text)

        c.save()

        pdf_content = buffer.getvalue()
        buffer.close()

        return pdf_content

    def generator_layout_2(user_profile):

        buffer = BytesIO()

        c = canvas.Canvas(buffer, pagesize=letter)

        photo_path = os.path.join(
            settings.BASE_DIR, user_profile.photo.url.lstrip('/'))

        name_height = 650

        c.drawImage(photo_path, x=450, y=name_height-inch,
                    width=1.5 * inch, height=1.5 * inch)

        c.setFont("Helvetica", 12)

        label_color = colors.HexColor('#808080')

        c.setFillColor(label_color)
        c.drawString(100, 650, "Full Name:")
        c.drawString(100, 630, "Email:")
        c.drawString(100, 610, "Phone:")
        c.drawString(100, 590, "About:")

        c.setFillColor(colors.black)

        c.drawString(
            200, 650, f"{user_profile.first_name} {user_profile.last_name}")
        c.drawString(200, 630, f"{user_profile.email}")
        c.drawString(200, 610, f"{user_profile.phone_number}")

        about_text = user_profile.about
        about_lines = textwrap.wrap(about_text, width=35)
        y_about = 590
        for line in about_lines:
            c.drawString(200, y_about, line)
            y_about -= 15

        y_position = 400
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Education:")
        c.setFillColor(colors.black)
        for education in user_profile.educations.all():
            c.drawString(
                200, y_position, f"{education.degree} at {education.school_name} ({education.graduation_year})")
            y_position -= 20

        y_position -= 20
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Experience:")
        c.setFillColor(colors.black)
        for experience in user_profile.experiences.all():
            c.drawString(
                200, y_position, f"{experience.job_title} at {experience.company_name} ({experience.start_date} - {experience.end_date})")
            y_position -= 20

        y_position -= 20
        c.setFillColor(label_color)
        c.drawString(100, y_position, "Skills:")
        c.setFillColor(colors.black)
        skills_text = ', '.join(
            [skill.skill_name for skill in user_profile.skills.all()])
        c.drawString(200, y_position, skills_text)

        c.save()

        pdf_content = buffer.getvalue()
        buffer.close()
    
        return pdf_content
