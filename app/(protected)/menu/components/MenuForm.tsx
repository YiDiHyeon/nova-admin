'use client'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { MenuItem } from '@/app/shared/types/menu'
import { Input } from '@/components/ui/input'
import { Field, FieldContent, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useMemo } from 'react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface MenuFormProps {
  menus: MenuItem[]
  selectedMenu?: MenuItem | null
}

// 권한 목록 예시 (실제로는 API에서 받아오거나 상수로 관리)
const ROLE_OPTIONS = [
  { label: '관리자 (ADMIN)', value: 'ADMIN' },
  { label: '일반사용자 (USER)', value: 'USER' },
  { label: '매니저 (MANAGER)', value: 'MANAGER' },
]

export default function MenuForm({ menus, selectedMenu }: MenuFormProps) {
  // props로 받은 menus에서 대메뉴만 필터링 (useMemo로 최적화)
  const parentMenu = useMemo(() => {
    return menus.filter((item) => item.parentId === null)
  }, [menus])

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<MenuItem>({
    defaultValues: {
      id: 0,
      code: 0,
      name: '',
      slug: '',
      parentId: null,
      order: 0,
      visible: true,
      roles: [],
    },
  })

  const watchedSlug = watch('slug')
  const watchedParentId = watch('parentId')

  const previewPath = useMemo(() => {
    const currentSlug = watchedSlug || ''

    // 상위 메뉴가 없거나 'root'인 경우
    if (!watchedParentId || watchedParentId === 0) {
      return `/${currentSlug}`.replace('//', '/') // 슬러시 중복 방지
    }

    // 상위 메뉴 찾기
    const parent = menus.find((m) => m.id === Number(watchedParentId))
    if (parent) {
      // 부모의 path가 이미 있다면 활용, 없으면 slug 조합 (데이터 구조에 따라 조정)
      // 보통 path는 /parent 형식일 테니 바로 합칩니다.
      return `${parent.path}/${currentSlug}`.replace('//', '/')
    }

    return `/${currentSlug}`
  }, [watchedSlug, watchedParentId, menus])

  // selectedMenu가 변경될 때마다 폼 데이터 업데이트
  useEffect(() => {
    if (selectedMenu && selectedMenu.id) {
      reset({
        ...selectedMenu,
      })
    } else {
      reset({
        id: 0,
        code: 0,
        name: '',
        slug: '',
        parentId: null,
        order: 0,
        visible: true,
        roles: [],
      })
    }
  }, [selectedMenu, reset])

  const onsubmit = (data: MenuItem) => {
    if (selectedMenu && selectedMenu.id > 0) {
      console.log('수정:', data)
      // TODO: API 호출 - 수정 로직
    } else {
      console.log('저장:', data)
      // TODO: API 호출 - 저장 로직
    }
  }

  const handleDelete = () => {
    if (!selectedMenu?.id) return
    if (confirm('정말 삭제하시겠습니까?')) {
      console.log('삭제:', selectedMenu.id)
      // TODO: API 호출 - 삭제 로직
    }
  }

  // 신규 등록인지 여부 (selectedMenu가 없거나, id가 0 또는 없으면 신규)
  const isNew = !selectedMenu || !selectedMenu.id || selectedMenu.id === 0

  return (
    <div className="w-full p-4">
      <h2 className="mb-4 text-lg font-semibold">{isNew ? '메뉴 등록' : '메뉴 수정'}</h2>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
        {/* 메뉴명 */}
        <Field>
          <FieldLabel>메뉴명</FieldLabel>
          <div className="relative">
            <Input
              id="name"
              placeholder="메뉴명을 입력해주세요"
              className="h-12"
              {...register('name', {
                required: '메뉴명을 입력해주세요.',
              })}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </Field>

        {/* 상위 메뉴 */}
        <Field>
          {/* 상위 메뉴 */}
          <FieldLabel>상위 메뉴</FieldLabel>
          <Controller
            control={control}
            name="parentId"
            render={({ field }) => (
              <Select
                // 값이 없거나 null이면 "root"로 처리하여 대메뉴 옵션을 선택하게 함
                value={field.value ? String(field.value) : 'root'}
                onValueChange={(val) => {
                  // "root" 선택 시 null로 설정, 그 외에는 숫자로 변환
                  field.onChange(val === 'root' ? null : Number(val))
                }}
              >
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="상위 메뉴를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* 대메뉴 선택 옵션 추가 */}
                    <SelectItem value="root" className="text-muted-foreground">
                      상위 메뉴 없음 (대메뉴)
                    </SelectItem>
                    {parentMenu.map((item) => (
                      <SelectItem value={String(item.id)} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        {/* 슬러그 */}
        <Field>
          <FieldLabel>슬러그</FieldLabel>
          <FieldContent className="text-sm">
            영문 소문자만 가능하며 특수기호는 하이픈(&#39;-&#39;)만 사용해주세요.
          </FieldContent>
          <div className="relative">
            <Input
              id="slug"
              placeholder="슬러그를 입력해주세요"
              className="h-12"
              {...register('slug', {
                required: '슬러그를 입력해주세요.',
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message: '영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.',
                },
              })}
            />
          </div>
          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
            <span className="font-medium">전체 경로 미리보기:</span>
            <code className="bg-muted text-foreground rounded px-1 py-0.5 font-mono">
              {previewPath === '/' ? '입력 전' : previewPath}
            </code>
          </div>
          {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
        </Field>

        {/* 권한 (Roles) 추가 */}
        <Field>
          <FieldLabel>접근 권한</FieldLabel>
          <FieldContent className="text-sm">
            이 메뉴에 접근 가능한 역할을 선택해주세요.
          </FieldContent>
          <div className="flex flex-wrap gap-4 pt-2">
            <Controller
              control={control}
              name="roles"
              render={({ field }) => {
                return (
                  <>
                    {ROLE_OPTIONS.map((role) => (
                      <div key={role.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role.value}`}
                          checked={field.value?.includes(role.value)}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || []
                            if (checked) {
                              field.onChange([...currentValues, role.value])
                            } else {
                              field.onChange(currentValues.filter((v) => v !== role.value))
                            }
                          }}
                        />
                        <Label
                          htmlFor={`role-${role.value}`}
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {role.label}
                        </Label>
                      </div>
                    ))}
                  </>
                )
              }}
            />
          </div>
        </Field>

        {/* 사용여부 */}
        <Field>
          <FieldLabel>사용여부</FieldLabel>
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="visible"
              render={({ field }) => (
                <Switch id="visible" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <span className="text-sm text-gray-500">{/* 현재 상태 표시 (선택 사항) */}</span>
          </div>
        </Field>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 pt-4">
          {isNew ? (
            <Button type="submit">저장</Button>
          ) : (
            <>
              <Button type="button" variant="destructive" onClick={handleDelete}>
                삭제
              </Button>
              <Button type="submit">수정</Button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
