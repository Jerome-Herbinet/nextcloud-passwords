<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Exception\SecurityCheck;

use Exception;
use GuzzleHttp\Exception\ClientException;

/**
 * Class PasswordDatabaseDownloadException
 *
 * @package OCA\Passwords\Exception\SecurityCheck
 */
class PasswordDatabaseDownloadException extends Exception {
    const EXCEPTION_CODE    = 106;
    const EXCEPTION_MESSAGE = '';

    /**
     * PasswordDatabaseDownloadException constructor.
     *
     * @param \Throwable|null $previous
     */
    public function __construct(\Throwable $previous = null) {
        $message = 'Failed to download common passwords zip file';
        if($previous instanceof ClientException) {
            $message .= " HTTP {$previous->getResponse()->getStatusCode()}";
        } else if($previous instanceof \Throwable) {
            $message .= $previous->getMessage();
        }

        parent::__construct($message, static::EXCEPTION_CODE, $previous);
    }
}