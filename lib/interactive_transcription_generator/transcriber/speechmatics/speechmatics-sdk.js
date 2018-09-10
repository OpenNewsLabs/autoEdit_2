/**
 * From repository https://github.com/BessemerAlliance/speechmatics
 * 9 Sept 2018 - added here because npm version is not up to date with latest version 
 * that supports multiple languages
 * awaiting this issue to be resolved: https://github.com/BessemerAlliance/speechmatics/issues/6
 */
'use strict';

const request = require('request');
const fs = require('fs');


function SpeechmaticsError(obj) {
  Error.captureStackTrace(this, this.constructor);
  Object.assign(this, obj);
  this.name = this.constructor.name;
  this.statusCode = obj.code;
  this.message = obj.error;
}
require('util').inherits(SpeechmaticsError, Error);


class Client {
  constructor(userId, apiToken, opts) {
    if (!userId) throw new Error('API User ID required');
    if (!apiToken) throw new Error('API Auth Token required');
    if (!(this instanceof Client)) {
      return new Client(userId, apiToken, opts);
    }

    this.userId = userId;
    this.apiToken = apiToken;

    opts = opts || {};
    this.baseUrl = opts.baseUrl || 'https://api.speechmatics.com';
    this.apiVersion = opts.apiVersion || '1.0';
    this.callbackUrl = opts.callbackUrl;
    this.headers = opts.headers || {};

    return this;
  }

  makeRequest(method, path, opts, done) {
    if (typeof opts === 'function') {
      done = done || opts;
      opts = {};
    }

    path = path.replace(':userId', this.userId);
    const options = Object.assign(opts, {
      method,
      json: true,
      headers: this.headers,
      baseUrl: this.baseUrl,
      url: `/v${this.apiVersion}/${path}`,
    });
    options.qs = options.qs || {};
    options.qs.auth_token = this.apiToken;

    request(options, (err, resp, body) => {
      if (!err && resp.statusCode >= 400) {
        err = new SpeechmaticsError(body);
      }
      if (typeof body === 'object') {
        const keys = Object.keys(body);
        if (keys.length === 1) body = body[keys[0]];
      }
      done(err, body);
    });
  }

  get(path, opts, done) {
    this.makeRequest('GET', path, opts, done);
  }

  post(path, opts, done) {
    opts = opts || {};
    //default for language model is english global
    var model = 'en';
     if(opts.model){
      model = opts.model;
     }
    //default for speaker diarization is off
    var diarisation = 'false';
    if(opts.diarisation){
        if(opts.diarisation === true){
          diarisation = 'true';
      }
    }
    const fd = Object.assign({
      model: model, //eg: 'en-US',
      diarisation: diarisation,
    }, opts.formData);
    //clean up model and diarization 
    delete opts.model;
    delete opts.diarisation;

    if (this.callbackUrl) {
      fd.notification = 'callback';
      fd.callback = this.callbackUrl;
    }

    if (opts.audioFilename) {
      fd.data_file = fs.createReadStream(opts.audioFilename);
      delete opts.audioFilename;
    } else if (opts.audioStream) {
      fd.data_file = opts.audioStream;
      delete opts.audioStream;
    }
    if (opts.textFilename) {
      fd.text_file = fs.createReadStream(opts.textFilename);
      delete opts.textFilename;
    } else if (opts.textStream) {
      fd.text_file = opts.textStream;
      delete opts.textStream;
    }
    opts.formData = fd;

    this.makeRequest('POST', path, opts, done);
  }


    /* User */
  getUser(opts, done) {
    this.get('user/:userId/', opts, done);
  }

  getPayments(opts, done) {
    this.get('user/:userId/payments/', opts, done);
  }

  getJobs(opts, done) {
    this.get('user/:userId/jobs/', opts, done);
  }

  createJob(opts, done) {
    this.post('user/:userId/jobs/', opts, done);
  }

  getJob(jobId, opts, done) {
    this.get(`user/:userId/jobs/${jobId}/`, opts, done);
  }

  getTranscript(jobId, opts, done) {
    this.get(`user/:userId/jobs/${jobId}/transcript`, opts, done);
  }

  getAlignment(jobId, opts, done) {
    this.get(`user/:userId/jobs/${jobId}/alignment`, opts, done);
  }


    /* Status */
  getStatus(opts, done) {
    this.get('status', opts, done);
  }


    /* Statics */
  static parseAlignment(text) {
    return text.toString().split('\n').reduce((arr, line) => {
      const re = /<time=(\d+\.\d+)>(\S*)<time=(\d+\.\d+)>/g;
      const words = [];

      function recurse(str) {
        const match = re.exec(str);
        if (match) {
          words.push({
            term: match[2],
            start: parseFloat(match[1], 10),
            end: parseFloat(match[3], 10),
          });
          recurse(str);
        }
      }
      recurse(line);

      if (words.length) {
        arr.push({
          start: words[0].start,
          end: words[words.length - 1].end,
          words,
        });
      }
      return arr;
    }, []);
  }
}

module.exports = Client;