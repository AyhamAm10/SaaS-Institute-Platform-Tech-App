// https://docs.expo.dev/guides/using-eslint/
// Enforces docs/rules/core.md (layers, 150-line files, tokens only, no state/effects/queries in ui/).
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

/** Visual primitives that only src/components may use. */
const RN_ALLOWED = 'Linking|Share|Alert|Keyboard|Platform';
const VISUAL_LIBS = [
  'react-native-reanimated', 'react-native-svg', 'expo-blur', 'expo-linear-gradient', '@expo/vector-icons',
  'react-native-gesture-handler', 'expo-image',
];
const LAYER_MESSAGE =
  'Visual code lives in src/components. Compose components (Stack, Row, Box, Text, Surface...) instead.';

const colorRules = [
  { selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]', message: 'No hex color literals outside core/theme and core/brand.' },
  { selector: 'Literal[value=/^rgba?\\(/]', message: 'No rgb()/rgba() color literals outside core/theme and core/brand.' },
  { selector: 'TemplateElement[value.raw=/^(#[0-9a-fA-F]{3,8}|rgba?\\()/]', message: 'No color literals outside core/theme and core/brand.' },
];

const featureScopes = ['src/features/**/*.{ts,tsx}', 'src/app/**/*.{ts,tsx}'];

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*', '.expo/*'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
    },
  },
  {
    // Layer 1+2: features and routes never touch visual primitives, style props or colors.
    files: featureScopes,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react-native'],
              importNamePattern: `^(?!(${RN_ALLOWED})$).*`,
              message: `Only ${RN_ALLOWED.split('|').join(', ')} may be imported from react-native here. ${LAYER_MESSAGE}`,
            },
            ...VISUAL_LIBS.map((name) => ({ group: [name], message: LAYER_MESSAGE })),
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: "JSXAttribute[name.name='style']", message: 'No style props outside components. Use Stack/Row/Box props and component variants.' },
        ...colorRules,
      ],
    },
  },
  {
    // ui/ is pure presentation: no state, effects or queries (core.md section 3).
    files: ['src/features/**/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@tanstack/react-query'], message: 'ui/ never queries: read the store through use<X>Mirror.' },
            { group: ['react-native'], importNamePattern: `^(?!(${RN_ALLOWED})$).*`, message: LAYER_MESSAGE },
            ...VISUAL_LIBS.map((name) => ({ group: [name], message: LAYER_MESSAGE })),
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: "JSXAttribute[name.name='style']", message: 'No style props outside components.' },
        { selector: 'CallExpression[callee.name=/^(useEffect|useLayoutEffect|useQuery|useMutation|useInfiniteQuery)$/]', message: 'ui/ has no effects or queries (core.md section 3).' },
        ...colorRules,
      ],
    },
  },
  {
    // Layer 3: components know no feature and hold no color literal (tokens only).
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ group: ['@/features/*', '@/app/*'], message: 'A component never imports a feature.' }] }],
      'no-restricted-syntax': ['error', ...colorRules],
    },
  },
  {
    // Layer 4: core knows no component and no feature. Colors live only in core/theme and core/brand.
    files: ['src/core/**/*.{ts,tsx}'],
    ignores: ['src/core/theme/**', 'src/core/brand/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ group: ['@/components/*', '@/features/*'], message: 'core is below components and features.' }] }],
      'no-restricted-syntax': ['error', ...colorRules],
    },
  },
]);
