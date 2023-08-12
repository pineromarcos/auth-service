# Get running containers and put them into an array
runningContainers=( $(docker-compose --env-file ${ENV_FILE} ps --services) )
runningContainers=( Exit "${runningContainers[@]%/}" ) # Insert Exit choice

# Check if we have some running containers
if ((${#runningContainers[@]}<=1)); then
    echo 'No running containers. Bye!'
    exit 0
fi
 
# Display the menu:
echo 'Please select a container to bash in. Enter 0 to exit:'
for i in "${!runningContainers[@]}"; do
    echo "   $i ${runningContainers[i]}"
done
printf '\n'

# Now wait for user input
while true; do
    read -e -r -p 'Select a container (number): ' SELECTED_CONTAINER_NUMBER
    # Check that user's choice is a valid number
    # if [[ $SELECTED_CONTAINER_NUMBER = +([[:digit:]]) ]]; then
    if [ $SELECTED_CONTAINER_NUMBER -eq $SELECTED_CONTAINER_NUMBER 2>/dev/null ]
    then
        # Force the number to be interpreted in radix 10
        ((SELECTED_CONTAINER_NUMBER=10#$SELECTED_CONTAINER_NUMBER))
        # Check that selected choice is valid (it exists)
        ((SELECTED_CONTAINER_NUMBER<${#runningContainers[@]})) && break
    fi
    echo -e 'Invalid choice, please try again.\n'
done

# Exiting if we selected 0 option. Otherwise, start rolling back.
if ((SELECTED_CONTAINER_NUMBER==0)); then
    echo 'Bye!'
    exit 0
fi

SELECTED_CONTAINER=${runningContainers[SELECTED_CONTAINER_NUMBER]}