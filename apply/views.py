from django.shortcuts import get_object_or_404, render, redirect
from .models import Post
from django.http import HttpRequest, HttpResponse
from .forms import PostForm
from django.views.generic import ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib import messages

@login_required
def post_new(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user  # 현재 로그인 User Instance
            # post = form.save(commit=True)
            post.save()
            messages.success(request, '포스팅을 저장했습니다.')
            return redirect(post)
    else:
        form = PostForm()

    return render(request, 'post/post_form.html', {
        'form': form,
        'post': None
    })

@login_required
def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)

    # 작성자 Check Tip
    if post.author != request.user:
        messages.error(request, '작성자만 수정할 수 있습니다.')
        return redirect(post)

    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            post = form.save()
            messages.success(request, '포스팅을 수정했습니다.')
            # post = form.save(commit=True)
            return redirect(post)
    else:
        form = PostForm(instance=post)

    return render(request, 'post/post_form.html', {
        'form': form,
        'post': post,
    })

@login_required
def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        post.delete()
        messages.success(request, '포스팅을 삭제했습니다.')
        return redirect('apply:post_list')
    return render(request, 'post/post_confirm_delete.html', {
        'post': post,
    })


def post_list(request):
    qs = Post.objects.all() # QuerySet
    q = request.GET.get('q', '')
    if q:
        qs = qs.filter(title__icontains=q)
    return render(request, 'post/post_list.html', {
        'post_list':qs,
        'q': q,
    })

# class PostListView(LoginRequiredMixin, ListView):
#     model = Post
#     paginate_by = 100

# post_list = PostListView.as_view()


def post_detail(request: HttpRequest, pk: int) -> HttpResponse:
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'post/post_detail.html', {
        'post':post
    })

# class PostDetailView(DetailView):
#     model = Post
#     # queryset = Post.objects.filter(is_public=True)

#     def get_queryset(self):
#         qs = super().get_queryset()
#         if not self.request.user.is_authenticated:
#             qs = qs.filter(is_public=True)
#         return qs

# post_detail = PostDetailView.as_view()