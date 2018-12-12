The steps to undertake are easy to follow and execute. For this manual we assume the user already has intellij installed and running, and has been invited to the git to pull the project. This manual does not explain how to set up a working connection with the database, because this is already configured in the code and since the database is already online, does not require to be configured. We start off by downloading the project from git, once the project has been downloaded it’s time to get some configurations up and running. 

Step one : 
We start off by importing the back-end. To import the back-end click on file and hover over the ‘New’ tab, once hovered the field to the right of it will appear with the option ‘Project from Existing Sources...’, press that. 
![Screen1](https://drive.google.com/open?id=1AI6WIJ7KYEAfccJ_FLMnsZIKZLB7Yay9)

Once pressed navigate to the ‘BackEnd’ folder and select the ‘pom.xml’ file, this will import the back-end using the Maven archetype. 
![Screen2](https://drive.google.com/open?id=1xOTZaOprILtfVHziJhsekhys-QMd-VoU)

Keep pressing ‘Next’ until the screen disappear and wait a minute for the back-end to be imported. Once imported you will have access to the back-end and the Maven options 

Step two :
Time to install and configure the Payara server, so that the project can be worked on. To install the Payara server use the following link : https://www.payara.fish/software/downloads/all-downloads/

Once it’s installed it’s time to add the configuration and set it up accordingly. Start by going to ‘Add configuration’ in intellij
![Screen3](https://drive.google.com/open?id=1JwCuBMCp3vT_lTMmC7Mary_SDdtJDrkt) 

On the next screen press on the ‘+’ sign and select a local Glassfish server, as Payara is based on Glassfish.
![Screen4](https://drive.google.com/open?id=1-dB1Bv_VPLRpJRKAa_8Ya1Hp728NNWoD)


On the next screen we can configure the server. Set it up according to the next screenshot.
![Screen5](https://drive.google.com/open?id=1RBEU7OoGaYZhDhASbFV2vFQudQ40ne0y)

Select the Payara folder as the Application Server and use ‘domain1’ as the Server Domain. Once that has been filled in it’s time to select the Artifact to be Deployed. Select the ‘Deployment’ tab at the top of the screen. At the right click on the ‘+’ symbol and select Artifact. Select the Wetwinkel:War artifact and finish up by pressing ‘OK’.
![Screen6](https://drive.google.com/open?id=1aQMww9zFhWOJGl6J_O5CBBzhHAY86AvW)

The server has now been configured.  

