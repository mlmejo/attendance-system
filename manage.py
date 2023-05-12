import os

from flask_migrate import Migrate

from app import create_app, db
from app.models import User

app = create_app()
migrate = Migrate(app, db, directory='database/migrations')


@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User)


@app.cli.command('reset_db')
def reset_db():
    os.remove('instance/database.sqlite')
