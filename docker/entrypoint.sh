#!/bin/sh

# Check if PODSLEEP is set to true
if [ "$PODSLEEP" = "true" ]; then
  echo "[ENTRYPOINT] PODSLEEP is true. Pod will sleep indefinitely..."
  # Sleep indefinitely to keep the pod running
  while true; do
    sleep 3600;
  done
else
  echo "[ENTRYPOINT] PODSLEEP is not set to true. Starting the Node.js application..."
  
  if [ "$NODE_ENV" = "development" ]; then
    echo "[ENTRYPOINT] Running in local environment. Using nodemon for hot-reloading..."
    npx nodemon -L src/pages/_app.js
  else
    echo "[ENTRYPOINT] Running in production environment..."
    npm start
  fi
fi
