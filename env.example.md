### DATABASE_URL="mongodb+srv://[username]:[password]@cluster0.f2qtcjj.mongodb.net/[your_database_name]"

### run `npx prisma init` tp create the .env file and the prisma folder

### run `npx prisma db push --skip-generate` to push the schema to the database

### run `npx prisma generate` to generate the client

DATABASE_URL="...above"

NEXTAUTH_SECRET=your_nextauth_secret

GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

### https://console.cloud.google.com/ => APIs & Services => OAuth consent screen => Credentials

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

PUSHER_APP_ID=your_pusher_app_id
PUSHER_APP_KEY=your_pusher_app_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
