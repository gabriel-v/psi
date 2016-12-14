from django.db import models


class QuestionGroup(models.Model):
    heading = models.TextField()
    text = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now=True)
    date_modified = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id) + ". " + self.heading


class Question(models.Model):
    text = models.TextField()
    question_group = models.ForeignKey(QuestionGroup)
    date_added = models.DateTimeField(auto_now=True)
    date_modified = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id) + ". " + self.text


class Choice(models.Model):
    text = models.TextField()
    question = models.ForeignKey(Question)
    option = models.CharField(max_length=2, default='X')
    date_added = models.DateTimeField(auto_now=True)
    date_modified = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id) + ". " + self.text


class Session(models.Model):
    name = models.TextField(blank=True)
    ip = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now=True)
    date_submitted = models.DateTimeField(null=True)

    def as_json_with_scores(self):
        return {
            "name": self.name,
            "date": self.date_submitted.isoformat(),
            "scores": self.calculate_scores(),
            "id": self.id,
        }

    def calculate_scores(self):
        def average(answers):
            options = ["A", "B", "C", "D"]
            num_ans = {o: 0 for o in options}
            sum_ans = {o: 0.0 for o in options}

            for answer in answers:
                option = answer.choice.option
                num_ans[option] += 1
                sum_ans[option] += answer.value

            for o in options:
                if num_ans[o] == 0:
                    num_ans[o] = 1
            return {o: sum_ans[o] / num_ans[o] for o in options}
        ids = set(response.choice.question.question_group.id for response in self.response_set.all())
        scores = {}
        for qgid in ids:
            ans = self.response_set.filter(choice__question__question_group_id=1)
            scores[qgid] = average(ans)
        return scores


class Response(models.Model):
    choice = models.ForeignKey(Choice)
    session = models.ForeignKey(Session)
    value = models.IntegerField()
    date_added = models.DateTimeField(auto_now=True)
    date_modified = models.DateTimeField(auto_now_add=True)
