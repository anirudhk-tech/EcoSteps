from db_config import connect

supabase = connect()

# def dump_data (data):
#     for x in range(len(data)):
#         response = (
#             supabase.table("tasks_small")
#             .upsert(
#                 {
#                     "id": x, 
#                     "task": data[x]['task'],
#                     "impact": data[x]['impact'],
#                     "category": data[x]['category']
#                 })
#             .execute()
#         )