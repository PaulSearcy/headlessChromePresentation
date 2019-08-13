FROM debian:stretch-slim
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    --no-install-recommends \
    && curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y \
    google-chrome-beta \
    fontconfig \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-symbola \
    fonts-noto \
    ttf-freefont \
    --no-install-recommends \
    && curl -sL https://deb.nodesource.com/setup_10.x > setup_10.x \
    && chmod +x setup_10.x \
    && ./setup_10.x \
    && apt install nodejs -y \
    && apt-get purge --auto-remove -y curl gnupg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm i
COPY . ./

CMD google-chrome --headless --disable-gpu --remote-debugging-port=9222 --cap-add=SYS_ADMIN --no-sandbox