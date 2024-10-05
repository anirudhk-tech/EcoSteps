'''
Central file that connects with supabase database. Supabase connection is already established.
'''

from db_config import connect

supabase = connect()