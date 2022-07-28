import React, {useState} from "react";
import { View, 
         Text, 
         Button, 
         StyleSheet, 
         ScrollView, 
         SafeAreaView, 
         Alert, 
         TextInput,
         TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../../assets/colors'

// PREPROCESSORS for Unit testing
const UNIT_UPDATE_WORKOUT   = true;
const UNIT_DISPLAY_WORKOUTS = true;
const UNIT_DELETE_WORKOUT   = true;

let workoutCards = new Array();

const WorkoutScreen = ({ navigation }) => {

    // The error message state
    const [txtError, setTextError] = useState('');

    const [renderUpdate, setRenderUpdate] = useState(false);

    const Card = ({ data }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardDataContainer}>
                    <Text style={styles.lblData}> Workout: {data.name} </Text>
                    <Text style={styles.lblData}> Reps: {data.reps}    </Text>
                    <Text style={styles.lblData}> Sets: {data.sets}    </Text>
                    <Text style={styles.lblData}> Total Weight (lb): {data.totalWeight}</Text>
                    <Text style={styles.lblData}> Time Spent: {data.timeSpent} </Text>
                </View>
                
                {/*Edit and Delete icons*/}
                <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={() => alert('Editing')}>
                        <Feather name='edit' size={25} color={colors.CJpurple} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {trash(data.name);}}>
                        <Ionicons name="trash-outline" color={colors.red} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    const logout = () => {
        setTextError('');
        global.email = "";
        global.password = "";
        global.userId = "";
        global.token = "";
        global.fullName = "";
        global.exercises = [];
        global.exerciseMap.clear();
        workoutCards = [];
        navigation.navigate('Login');
    }
    
    const updateWorkout = async (workoutName) => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for updating a workout
        if (UNIT_UPDATE_WORKOUT) {
            obj = {_id: global.exerciseMap.get('something'), token: global.token, 
                   name: 'somethingTheSequel', userId: '777', reps: '99', sets: '99', 
                   totalWeight: '9000', timeSpent: '99'};
        }
        // --------------------------------->
        else {
            //TODO: Need to first check the workout name is a key in the map, then fill accordingly
            //obj = {_id: global.exerciseMap.get('something'), token: global.token, 
            //       name: , userId: global.userId, reps: , sets: , totalWeight: , timeSpent: };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/updateWorkout',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.message == undefined) {
            setTextError('Error occurred updating workout');
        }
        else {
            // Toggle render update to force a render
            setRenderUpdate(!renderUpdate);
        }
    }

    const displayWorkouts = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for displaying workouts
        if (UNIT_DISPLAY_WORKOUTS) {
            obj = {token: global.token, userId: '777'};
        }
        // --------------------------------->
        else {
            obj = {token: global.token, userId: global.userId};
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/displayWorkouts',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        let res = JSON.parse(await response.text());

        if (res.status != undefined) {
            setTextError('Could not display your workouts');
        }
        else {
            global.exercises = res.results;

            // Toggle render update to force a render
            setRenderUpdate(!renderUpdate);
        }
    }

    const deleteWorkout = async (workoutName) => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for deleting a workout
        if (UNIT_DELETE_WORKOUT) {
            obj = {token: global.token, _id: global.exerciseMap.get('something')};
        }
        // --------------------------------->
        else {
            obj = {token: global.token, _id: global.exerciseMap.get(workoutName)};
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/deleteWorkout',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.message == undefined) {
            setTextError('Could not delete that workout');
        }
        else {
            global.exerciseMap.delete(workoutName);

            let index = global.exercises.findIndex(obj => obj.name === workoutName);
            global.exercises.splice(index, 1);

            // Toggle render update to force a render
            setRenderUpdate(!renderUpdate);
        }
    }

    const trash = (workoutName) => {
        Alert.alert("Delete Workout", "Are you sure you want to delete this workout?", [
            {text: "Yes", onPress: () => {deleteWorkout(workoutName);}},
            {text: "No",  onPress: () => {return;}}
        ])
    }

    // The render of the error message if there was one
    const errorRender = () => {
        if (txtError != '')
            return (<View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.lblError}>{txtError}</Text>
                    </View>);
        else
            return (<View/>);
    }

    const unitTestingRender = () => {
        if (UNIT_DISPLAY_WORKOUTS)
            return (<TouchableOpacity onPress={() => { displayWorkouts(); }}>
                        <Text style={{ color: colors.white }}>
                            Tell me your displaying without showing me it (Click me!)
                        </Text>
                    </TouchableOpacity>);
        else if (UNIT_DELETE_WORKOUT)
            return (<TouchableOpacity onPress={() => { deleteWorkout(); }}>
                        <Text style={{ color: colors.white }}>
                            Delete something behind your back (Click me!)
                        </Text>
                    </TouchableOpacity>);
        else
            return (<View/>);
    }

    const cardsRender = () => {
        const isFocused = useIsFocused();

        if (isFocused && global.exercises.length != 0) {
            // Since we're getting the workouts again, reset
            workoutCards = [];

            for (let i = 0; i < global.exercises.length; i++) {
                if (!global.exerciseMap.has(global.exercises[i].name))
                {
                    global.exerciseMap.set(global.exercises[i].name, global.exercises[i]._id);
                }

                workoutCards.push({
                    name:        global.exercises[i].name,
                    reps:        global.exercises[i].reps,
                    sets:        global.exercises[i].sets,
                    totalWeight: global.exercises[i].totalWeight,
                    timeSpent:   global.exercises[i].timeSpent,
                });
            }

            return (
                <View style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {/*With an array (workoutCards), the map() function will take each element (item) and 
                       instantiate a new card with the given data. The key is to get rid of a warning
                       about each child needing a 'unique' key*/}
                    {workoutCards.map(item => <Card key={item.name} data={item}/>)}
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: "15%", paddingHorizontal: 10 }}>
                <Text style={styles.lblUserName}>
                    Ready, {global.fullName}!
                </Text>

                <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: 55 }} onPress ={() => {logout();}}>
                    <Ionicons name="exit-outline" color={colors.red} size={30} />
                    <Text style={styles.lblLogout}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', paddingTop: 30, paddingBottom: 20 }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('AddWorkout')}>
                    <Ionicons name="add-outline" color={colors.green} size={30} />

                    <Text style={{ color: colors.green, paddingTop: 8 }}>
                        Add Workout
                    </Text>
                </TouchableOpacity>

                <View style={{paddingTop: 8, paddingLeft: '60%'}}>
                    <TouchableOpacity onPress={() => {displayWorkouts()}}>
                        <Feather name='refresh-cw' size ={20} color={colors.green}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchBar}>
                <Feather name='search' size={20} color="black" style={{ marginRight: 5 }} />
                <TextInput placeholder="Search Saved Workouts" />
            </View>

            <ScrollView>
                {errorRender()}
                
                {/* {unitTestingRender()} */}

                {cardsRender()}

            </ScrollView>
            
            {/*A small buffer between the list and Tabs*/}
            <ScrollView style={{ paddingTop: 20, paddingHorizontal: 10 }}/>
        </SafeAreaView >
    )
}

export default WorkoutScreen;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: colors.black,
    },
    cardContainer: {
        width: '80%',
        shadowColor: 'black', 
        shadowRadius: 2, 
        shadowOffset: { width: -5, height: 10, }, 
        shadowOpacity: 0.5, 
        flex: 1, 
        padding: 25, 
        paddingBottom: -20, 
        backgroundColor: colors.white,
        margin: 20, 
        borderRadius: 10
    },
    cardDataContainer: {
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    addWorkout: {
        flexDirection: 'row',
    },
    editBtn: {
        left: 10,
        top: 10,
    },
    plusBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    WO_list: {
        borderColor: 'black',
    },
    lblUserName: {
        fontSize: 25, 
        fontWeight: 'bold', 
        color: colors.CJpurple
    },
    lblLogout: {
        paddingTop: "1%", 
        paddingRight: '5%', 
        color: colors.red, 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    lblData: {
        fontWeight: 'bold',
        color: colors.black
    },
    lblError: {
        fontSize: 25,
        color: colors.red
    },
    searchBar: {
        flexDirection: 'row', 
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 8, 
        paddingHorizontal: 10, 
        paddingVertical: 8, 
        backgroundColor: colors.white, 
        margin: 10 
    }
})
