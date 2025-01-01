function updateTaskStatus(button) {
    const taskId = button.getAttribute('data-id'); // Obtener el ID de la tarea desde el botón

    fetch(`/task/byId/${taskId}`)
        .then(response => response.json())
        .then(taskData => {

            // Mostrar un cuadro de diálogo con SweetAlert para cambiar solo el estado
            Swal.fire({
                title: 'Actualizar Estado de la Tarea',
                html: `
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                Estado
                            </label>
                            <select id="status" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                bg-white transition duration-200">
                                <option value="pendiente" ${taskData.status === 'pendiente' ? 'selected' : ''}>📋 Pendiente</option>
                                <option value="en_progreso" ${taskData.status === 'en_progreso' ? 'selected' : ''}>⏳ En Progreso</option>
                                <option value="completada" ${taskData.status === 'completada' ? 'selected' : ''}>✅ Completada</option>
                            </select>
                        </div>
                    </div>
                `,
                customClass: {
                    container: 'font-sans',
                    popup: 'rounded-xl shadow-xl',
                    header: 'border-b pb-4',
                    title: 'text-xl font-bold text-gray-800',
                    content: 'pt-4',
                    confirmButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200',
                    cancelButton: 'px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200'
                },
                showCancelButton: true,
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3B82F6',
                cancelButtonColor: '#6B7280',
                preConfirm: () => {
                    // Obtener el nuevo estado de la tarea
                    const data = {
                        id: taskId,
                        status: document.getElementById('status').value,
                        deadline: taskData.deadline // Asegúrate de que el valor de 'deadline' se está enviando correctamente
                    };

                    if (!data.status) {
                        Swal.showValidationMessage('Por favor, selecciona un estado');
                        return null;
                    }

                    // Enviar la actualización al backend
                    return fetch('/task/update', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(result => {
                            console.log('Respuesta del servidor:', result);  // Muestra la respuesta en la consola
                            if (result.success) {
                                return result;
                            } else {
                                throw new Error(result.error || 'Error desconocido al actualizar la tarea');
                            }
                        })
                        .catch(error => {
                            Swal.showValidationMessage(`Error: ${error.message}`);
                        });
                }
            }).then((result) => {
                if (result.isConfirmed && result.value.success) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        customClass: {popup: 'rounded-lg shadow-md'}
                    });

                    Toast.fire({
                        icon: 'success',
                        title: result.value.message
                    }).then(() => location.reload());
                }
            });
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener la información de la tarea',
                customClass: {popup: 'rounded-lg'}
            });
        });
}

function logout() {
    // Muestra la confirmación antes de cerrar sesión
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres cerrar sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, cancelar',
        customClass: {
            confirmButton: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            cancelButton: 'px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Si confirma el cierre de sesión, realiza la solicitud POST al backend
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cerrar sesión');
                    }
                    return response.json(); // Parsea la respuesta como JSON
                })
                .then(data => {
                    // Manejo de la respuesta JSON
                    if (data.success) {
                        // Notifica al usuario y redirige a la página de inicio
                        Swal.fire({
                            icon: 'success',
                            title: data.message || 'Sesión cerrada correctamente',
                            timer: 2000,
                            showConfirmButton: false,
                            toast: true,
                            position: 'top',
                            timerProgressBar: true
                        }).then(() => {
                            window.location.href = '/'; // Redirige al inicio
                        });
                    } else if (data.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.error,
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al cerrar la sesión',
                    });
                });
        }
    });
}
