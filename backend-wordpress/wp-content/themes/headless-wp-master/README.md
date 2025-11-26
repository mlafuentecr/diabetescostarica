
# Develop branch headless-wp
Testing headless-wp with gatsby
All latest files that are in development that will be merge when they are ready to staging

## Installation
Use the package manager [npm] to install .
```bash
npm install
gatsby develop
gatsby build
```
------------
## SITE Progres 

 | <a href="https://agh.boommm.mybluehost.me/wp-json/wp/v2/posts/1"> Wp access Backend</a> |           |
| ------------  |  ------------ | 
|       Maxi 	|  @XnrkjTuLl5  | 
|  Roger        |  NL$KtiyMpVy  | 

https://agh.boommm.mybluehost.me/wp-json/wp/v2/posts?categories=6
//get post from cat landing id 6


------------
## Gatsby To-dos:
<pre>
 &rarr; General
      <s>Routering Internal pages and post </s>
       <s>SITE PROBLEM WITH FIREFOX HAVE TO FIX </s>
      <s> Config Tabs Horizontal and vertical</s>
      <s> mobile menu submenu arrow </s>
        <s>got to top footer</s>
      Config Lazy Loading problem with declare zise
     <s> -Rebuild index querys  estructure for language
      and call slider for each lng perhaps acf so I can
      tell if use the same language or diferent</s>
      Configure graphql Authorization
      Live Chat Test
     On load Is showing  some text should show a loading
     push notification dosent work in IOs
     save variable of language when client change it and loadit at start
     creat variable with plattaform and use toast for IOS
     think have clients in db for push 


    SEO
       <s> Config in wp regular wp settings wont work bc </s>languages</s>
        <s> create seo filds for index (en vi zh) </s>
         <s>create seo for each pg (en vi zh) </s>
         <s>create 404  for each lng(en vi zh) </s>
         I need to test it

    Languages
       <s> Config wp</s>
       <s> Make gatsby-node create dinaminc pgs for vi en and zh</s>
       <s> config global state so I can handle lng var</s>
        pass lng var to elements so I can change language in <s>elements like btn sliders</s>
        <s>modify querys to include lenguage</s>

    SECURITY
        Config WPGraphQL JWT Authentication
        .htaccess
        ###################################################
        # Used for the the JWT Plugin
        SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
        < IfModule mod_rewrite.c >
        RewriteEngine On
        RewriteCond %{HTTP:Authorization} ^(.*)
        RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]

        Check if working
        configure queries to use it

 &rarr; Index

  1 Menu
      <s>Call menu items and sub items to menu </s>
      <s>Make menu responsive</s>
      <s>List item</s>
      Have number and contact info on menu
      
  2 Slider
      <s>Configure Healines images for positioning</s>
      <s>Responsive Headline</s>
      Configure Videos
      Configure Link on the slider

  3 Loging box
   <s> add files to acf for loging</s>
   <s> config JSON data in gatsby</s>
   <s> css for loging </s>
    <s>  resolve problem from top loging to middle to menu login</s>
    Menu mobile loging box for internal pages *



&rarr; 2 Internal Pages
    <s>Call Internal pages from APi</s>
    <s>Responsive Headline</s>
       <s> Show open first tab</s>
      <s> Add modal for popup </s> 
    Make Tabs work for destop table and mobiles 
    fix footer

 

</pre>
   


## Wp headless To-dos:
<pre>
&rarr; Index:

    1 API
    <s>Configure graphql</s>
    <s>Configure ACF</s>
    <s>Config tabs</s>

    <b>2 Headline</b>
    <s>Configure Headline for images</s>
    <s> Configure Headline for Videos</s>
    <s>Headline responsive</s>
    Configure Link on the slider
    Configure video input on the slider
    Configure graphql Authorization
</pre>


