import { createAsyncThunkAndSlice } from './apiCreateSlice';

// ============== AUTH ==============
const { asyncThunk: signupThunk, slice: signupSlice } = createAsyncThunkAndSlice('auth', 'auth', 'signup', 'post');
const { asyncThunk: loginThunk, slice: loginSlice } = createAsyncThunkAndSlice('auth', 'auth', 'login', 'post');
const { asyncThunk: getMeThunk, slice: getMeSlice } = createAsyncThunkAndSlice('auth', 'auth', 'me', 'get');

// ============== AI GENERATION ==============
const { asyncThunk: generateHookThunk, slice: generateHookSlice } = createAsyncThunkAndSlice('ai', 'ai', 'generate-hook', 'post');
const { asyncThunk: analyzeHookThunk, slice: analyzeHookSlice } = createAsyncThunkAndSlice('ai', 'ai', 'analyze-hook', 'post');
const { asyncThunk: generateTitleThunk, slice: generateTitleSlice } = createAsyncThunkAndSlice('ai', 'ai', 'generate-title', 'post');
const { asyncThunk: analyzeScriptThunk, slice: analyzeScriptSlice } = createAsyncThunkAndSlice('ai', 'ai', 'analyze-script', 'post');
const { asyncThunk: generateIdeasThunk, slice: generateIdeasSlice } = createAsyncThunkAndSlice('ai', 'ai', 'generate-ideas', 'post');
const { asyncThunk: generateScriptThunk, slice: generateScriptSlice } = createAsyncThunkAndSlice('ai', 'ai', 'generate-script', 'post');
const { asyncThunk: getTrendingThunk, slice: getTrendingSlice } = createAsyncThunkAndSlice('ai', 'ai', 'trending', 'get');
const { asyncThunk: getDailyViralIdeasThunk, slice: getDailyViralIdeasSlice } = createAsyncThunkAndSlice('ai', 'ai', 'daily-viral-ideas', 'get');
const { asyncThunk: generateCaptionThunk, slice: generateCaptionSlice } = createAsyncThunkAndSlice('ai', 'ai', 'generate-caption', 'post');
const { asyncThunk: analyzeViralScoreThunk, slice: analyzeViralScoreSlice } = createAsyncThunkAndSlice('ai', 'ai', 'analyze-viral-score', 'post');
const { asyncThunk: improveCaptionThunk, slice: improveCaptionSlice } = createAsyncThunkAndSlice('ai', 'ai', 'improve-caption', 'post');
const { asyncThunk: analyzeVideoViralScoreThunk, slice: analyzeVideoViralScoreSlice } = createAsyncThunkAndSlice('ai', 'ai', 'analyze-video-viral-score', 'post');
const { asyncThunk: generateHashtagsThunk, slice: generateHashtagsSlice } = createAsyncThunkAndSlice('ai', 'ai', 'generate-hashtags', 'post');
const { asyncThunk: analyzeProfileThunk, slice: analyzeProfileSlice } = createAsyncThunkAndSlice('ai', 'ai', 'analyze-profile', 'post');
const { asyncThunk: generateFullPostThunk, slice: generateFullPostSlice } = createAsyncThunkAndSlice('ai', 'ai', 'generate-full-post', 'post');


// ============== AI STATS & HISTORY ==============
const { asyncThunk: getStatsThunk, slice: getStatsSlice } = createAsyncThunkAndSlice('ai', 'ai', 'stats', 'get');
const { asyncThunk: getHistoryThunk, slice: getHistorySlice } = createAsyncThunkAndSlice('ai', 'ai', 'history', 'get');

// ============== ADMIN ==============
const { asyncThunk: getAdminStatsThunk, slice: getAdminStatsSlice } = createAsyncThunkAndSlice('admin', 'admin', 'stats', 'get');
const { asyncThunk: getAdminUsersThunk, slice: getAdminUsersSlice } = createAsyncThunkAndSlice('admin', 'admin', 'users', 'get');
const { asyncThunk: updateRoleThunk, slice: updateRoleSlice } = createAsyncThunkAndSlice('admin', 'admin', 'users/:id/role', 'put');
const { asyncThunk: updateStatusThunk, slice: updateStatusSlice } = createAsyncThunkAndSlice('admin', 'admin', 'users/:id/status', 'put');
const { asyncThunk: updateCreditsThunk, slice: updateCreditsSlice } = createAsyncThunkAndSlice('admin', 'admin', 'users/:id/credits', 'put');
const { asyncThunk: updateUserPlanThunk, slice: updateUserPlanSlice } = createAsyncThunkAndSlice('admin', 'admin', 'users/:id/plan', 'put');
const { asyncThunk: getPaymentsThunk, slice: getPaymentsSlice } = createAsyncThunkAndSlice('admin', 'admin', 'payments', 'get');
const { asyncThunk: createAnnouncementThunk, slice: createAnnouncementSlice } = createAsyncThunkAndSlice('admin', 'admin', 'announcements', 'post');
const { asyncThunk: getAnnouncementsThunk, slice: getAnnouncementsSlice } = createAsyncThunkAndSlice('admin', 'admin', 'announcements', 'get');
const { asyncThunk: getAnalyticsThunk, slice: getAnalyticsSlice } = createAsyncThunkAndSlice('admin', 'admin', 'analytics', 'get');
const { asyncThunk: getSettingsThunk, slice: getSettingsSlice } = createAsyncThunkAndSlice('admin', 'admin', 'settings', 'get');
const { asyncThunk: updateSettingsThunk, slice: updateSettingsSlice } = createAsyncThunkAndSlice('admin', 'admin', 'settings', 'put');

export {
  // Auth
  signupThunk, signupSlice,
  loginThunk, loginSlice,
  getMeThunk, getMeSlice,

  // AI Generation
  generateHookThunk, generateHookSlice,
  analyzeHookThunk, analyzeHookSlice,
  generateTitleThunk, generateTitleSlice,
  analyzeScriptThunk, analyzeScriptSlice,
  generateIdeasThunk, generateIdeasSlice,
  generateScriptThunk, generateScriptSlice,
  getTrendingThunk, getTrendingSlice,
  getDailyViralIdeasThunk, getDailyViralIdeasSlice,
  generateCaptionThunk, generateCaptionSlice,
  analyzeViralScoreThunk, analyzeViralScoreSlice,
  improveCaptionThunk, improveCaptionSlice,
  analyzeVideoViralScoreThunk, analyzeVideoViralScoreSlice,
  generateHashtagsThunk, generateHashtagsSlice,
  analyzeProfileThunk, analyzeProfileSlice,
  generateFullPostThunk, generateFullPostSlice,


  // AI Stats & History
  getStatsThunk, getStatsSlice,
  getHistoryThunk, getHistorySlice,

  // ============== ADMIN ==============
  getAdminStatsThunk, getAdminStatsSlice,
  getAdminUsersThunk, getAdminUsersSlice,
  updateRoleThunk, updateRoleSlice,
  updateStatusThunk, updateStatusSlice,
  updateCreditsThunk, updateCreditsSlice,
  updateUserPlanThunk, updateUserPlanSlice,
  getPaymentsThunk, getPaymentsSlice,
  createAnnouncementThunk, createAnnouncementSlice,
  getAnnouncementsThunk, getAnnouncementsSlice,
  getAnalyticsThunk, getAnalyticsSlice,
  getSettingsThunk, getSettingsSlice,
  updateSettingsThunk, updateSettingsSlice
};
