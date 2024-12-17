// Firebase 설정
const firebaseConfig = {
    // Firebase 설정 정보 (실제 배포 시 추가)
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

document.getElementById('deletionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    try {
        // Firebase Function 호출
        const deletionRequest = firebase.functions().httpsCallable('requestAccountDeletion');
        await deletionRequest({ email, reason });

        // 성공 메시지 표시
        alert('Your deletion request has been received. We will process it within 7 business days.');
        document.getElementById('deletionForm').reset();
    } catch (error) {
        alert('Error submitting request: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Deletion';
    }
});
