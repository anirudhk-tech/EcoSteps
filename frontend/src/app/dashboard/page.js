import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

export default async function Dashboard() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <Box>
      <Box p={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello {data.user.email}!
        </Typography>
        
        {/* Grid for dashboard sections */}
        <Grid container spacing={3}>
          {/* Card 1: Profile */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Your Profile</Typography>
              <Typography variant="body1">Email: {data.user.email}</Typography>
              {/* Add more user information if available */}
            </Paper>
          </Grid>

          {/* Card 2: Tasks */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Tasks</Typography>
              <Typography variant="body1">You have no tasks today.</Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                View All Tasks
              </Button>
            </Paper>
          </Grid>

          {/* Card 3: Notifications */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="body1">You have no new notifications.</Typography>
            </Paper>
          </Grid>

          {/* Card 4: Articles */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Articles</Typography>
              <Typography variant="body1">No new articles to read.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}