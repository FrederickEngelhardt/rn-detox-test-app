export default function(spec) {

	spec.describe('HomeScreen', function() {

		spec.it('Shows activity buttons', async function() {
			await spec.exists('HomeScreen.Button');
			// await spec.fillIn('SearchBar.TextInput', 'Amy');
			// await spec.notExists('EmployeeList.JimCavy');
			// await spec.exists('EmployeeList.AmyTaylor');
		});

	});

	// spec.describe('Tapping on an employee', function() {
	//
	// 	spec.it('shows a button to email them', async function() {
	// 		await spec.fillIn('SearchBar.TextInput', 'Amy');
	// 		await spec.press('EmployeeList.AmyTaylor');
	// 		await spec.pause(1000);
	// 		await spec.exists('ActionBar.EmailButton');
	// 	});
	//
	// });
}
