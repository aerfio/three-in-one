# yes, I'll be using docker here, I don't wat to have this python #$%% on my laptop
FROM python:3.7.4-alpine3.10

RUN pip install django==2.1.4 graphene-django==2.2.0 django-filter==2.0.0 django-graphql-jwt==0.1.5

WORKDIR /app
COPY . .

EXPOSE 8000
CMD [ "python", "./django_graphql/manage.py", "runserver", "0.0.0.0:8000"]